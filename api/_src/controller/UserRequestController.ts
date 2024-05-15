import {AppDataSource} from "../data-source";
import {UserVehicleRequest} from "../entity/UserVehicleRequest";
import {UploadedFile} from "express-fileupload";
import {UploadFileResult} from "uploadthing/types";
import utApi from "../uploadthing";
import {User} from "../entity/User";

export class UserRequestController {
  public async submitRequest(req, res) {
    const {vehicleNumber} = req.body
    if (!vehicleNumber) {
      return res.status(400).json({message: 'vehicle number is required'})
    }

    if (await AppDataSource.getRepository(UserVehicleRequest).findOneBy({vehicleNumber})) {
      return res.status(400).json({message: 'Vehicle number already exists'})
    }

    if (!req?.files || Object.keys(req?.files).length !== 3) {
      return res.status(400).send('All files are required')
    }

    const {id, license, rcBook} = req.files as { [key: string]: UploadedFile }

    if (!id || !license || !rcBook) {
      return res.status(400).send('All files are required')
    }

    const uploadedResults: UploadFileResult[] =
      await utApi.uploadFiles([
        new File([id.data], id.name),
        new File([license.data], license.name),
        new File([rcBook.data], rcBook.name),
      ])

    if (uploadedResults.filter((result) => result.error).length > 0) {
      return res.status(500).json({message: 'Error uploading files, please try again'})
    }

    const urls = uploadedResults.map((result) => result.data.url)
    const userVehicleRequest = AppDataSource.getRepository(UserVehicleRequest).create({
      vehicleNumber,
      idCardUrl: urls[0],
      driverLicenseUrl: urls[1],
      vehicleRCBookUrl: urls[2],
      user: req.user as unknown as User,
    })

    await AppDataSource.getRepository(UserVehicleRequest).save(userVehicleRequest)

    res.json({message: 'Request submitted successfully', request: userVehicleRequest})
  }

  public async getUserRequest(req, res) {
    try {
      const userRequests = await AppDataSource.getRepository(UserVehicleRequest).findOne({where: {user: req.user}})
      res.json(userRequests)
    } catch (e) {
      res.status(400).json({message: 'Error fetching user requests'})
    }
  }

  public async getAllUserRequests(req, res) {
    try {
      const userRequests = await AppDataSource.getRepository(UserVehicleRequest).find({
        relations: ['user'],
        where: {status: 'pending'},
      })
      res.json(userRequests)
    } catch (e) {
      res.status(400).json({message: 'Error fetching user requests'})
    }
  }

  public async acceptUserRequest(req, res) {
    const {id} = req.params

    if (!id) {
      return res.status(400).json({message: 'Request id is required'})
    }

    try {
      const userRequest = await AppDataSource.getRepository(UserVehicleRequest).findOneByOrFail({id: Number(id)})

      if (!userRequest) {
        return res.status(404).json({message: 'Request not found'})
      }

      userRequest.setStatus('approved')
      await AppDataSource.getRepository(UserVehicleRequest).save(userRequest)

      res.json({message: 'Request approved'})
    } catch (e) {
      res.status(400).json({message: 'Error approving request'})
    }
  }

  public async rejectUserRequest(req, res) {
    const {id} = req.params

    try {
      const userRequest = await AppDataSource.getRepository(UserVehicleRequest).findOneByOrFail({id: Number(id)})

      if (!userRequest) {
        return res.status(404).json({message: 'Request not found'})
      }

      userRequest.setStatus('rejected')
      await AppDataSource.getRepository(UserVehicleRequest).save(userRequest)

      res.json({message: 'Request rejected'})
    } catch (e) {
      res.status(400).json({message: 'Error rejecting request'})
    }
  }
}

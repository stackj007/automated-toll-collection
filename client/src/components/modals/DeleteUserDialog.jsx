import axios from "axios";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "../ui/dialog.jsx";
import Button from "../ui/Button.jsx";

export function DeleteUserDialog({open, setIsDeleteDialogOpen, user}) {
    const hide = async () => {
        try {
            await axios.post("/api/delete-user", {id: user?.id});
            setIsDeleteDialogOpen(false);
            window.location.reload() // maybe replace the new to refresh with setUsers((users) => users.filter(u => u.id !== user.id))
        } catch (e) {
            console.error(e)
            alert(e.message) // replace with a better error handling
        }
    }

    return (
        <Dialog open={open} onOpenChange={setIsDeleteDialogOpen} >
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Delete user</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete {user?.name}?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit" className="destructive" onClick={hide}>delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

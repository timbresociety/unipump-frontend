import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import Profile from "./Profile"


const ProfileModal = ({
    open,
    setOpen
}: {
    open: boolean
    setOpen: (open: boolean) => void
}) => {
    return (

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when youre done.
                    </DialogDescription>
                </DialogHeader>
                <Profile />
            </DialogContent>
        </Dialog>
    )
}

export default ProfileModal
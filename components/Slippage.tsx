import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function Slippage() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Set Max Slippage</Button>
            </DialogTrigger>
            <DialogContent className="rounded-xl sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="mb-2">Slippage</DialogTitle>
                    <DialogDescription className="mt-2">
                        This is the maximum amount of slippage you are willing to accept when placing trades
                    </DialogDescription>
                </DialogHeader>
                <Input
                    id="name"
                    type="number"
                    defaultValue="Pedro Duarte"
                />
                <DialogFooter className="flex justify-end">
                    <Button type="submit">Save Slippage</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

"use client"
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent,CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Apple, Boxes, ChevronDown, ChevronLeft, LogOut, Menu, Ruler, Utensils } from "lucide-react";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import {motion} from "motion/react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ThemeToggle from "@/components/theme-toggle";

type RouteGroupType = {
    group: string
    items: {
        href: string
        label: string
        icon: ReactNode
    }[]
}

const ROUTE_GROUPS: RouteGroupType[] = [
    {
        group: "Foods Management",
        items: [
            {
                href: "/admin/foods-management/foods",
                label: "Foods",
                icon: <Apple className="mr-2 size-3"/>
            },
            {
                href: "/admin/foods-management/categories",
                label: "Categories",
                icon: <Boxes className="mr-2 size-3"/>
            },
            {
                href: "/admin/foods-management/serving-units",
                label: "Serving Units",
                icon: <Ruler className="mr-2 size-3"/>
            }
        ]
    },

    {
        group: "Meals Management",
        items: [
            {
                href: "/client",
                label: "Meals",
                icon: <Utensils className="mr-2 size-3"/>
            },
        ]
    }

]

type RouteGroupProps = RouteGroupType;

const RouteGroup = ({ group, items }: RouteGroupProps) => {
    const [open, setOpen] = useState(false)
    const pathName = usePathname()
    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
                <Button className="text-foreground/80 w-full font-normal flex justify-between" variant={"ghost"}>
                    {group}
                    <div className={`transition-transform ${open ? "rotate-180" : ""}`}>
                        <ChevronDown/>
                    </div>
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent forceMount>
                <motion.div 
                    className={`flex flex-col gap-2 ${!open ? "pointer-events-none": ""}`} 
                    initial={{height:0, opacity:0}}
                    animate={{height: open ? "auto" : 0, opacity: open ? 1 : 0}}
                    transition={{duration:0.2, ease: "easeInOut"}}>
                        {items.map((item) => (
                            <Button key={item.href} asChild variant={"link"} className="w-full justify-start font-normal">
                                <Link 
                                    className={`flex items-center rounded-md px-5 py-1 transition-all 
                                    ${pathName === item.href ? "bg-foreground/10 hover:bg-foreground/5" : "hover:bg-foreground/10" }`} href={item.href}>
                                        {item.icon}
                                        <span className="text-sm">{item.label}</span>
                                </Link>
                            </Button>
                        ))}
                    </motion.div>
            </CollapsibleContent>
        </Collapsible>
    )
}

type DashboardLayoutProps = {
    children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [open, setOpen] = useState(false);
  return (
    <div className="flex">
        <div className="bg-background fixed z-10 flex h-12 w-screen items-center justify-between border px-2">
            <Collapsible className="h-full" open={open} onOpenChange={setOpen}>
                <CollapsibleTrigger className="m-2" asChild>
                    <Button size={"icon"} variant={"outline"}>
                        <Menu/>
                    </Button>
                </CollapsibleTrigger>
            </Collapsible>

            <div className="flex">
                {/* ThemeTogle */}
                <ThemeToggle/>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="flex h-9 items-center gap-2 px-2" variant={"ghost"}>
                            <Avatar className="size-8">
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                            <span className="hidden md:inline">Admin</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Count</DropdownMenuLabel>
                        <DropdownMenuSeparator/>

                        <div className="flex items-center gap-3 px-2 py-1.5">
                            <Avatar className="size-10">
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium">Admin</p>
                                <p className="text-muted-foreground text-xs">admin@test.com</p>
                            </div>
                        </div>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem
                            onClick={() => {
                                //logout
                            }}
                            variant="destructive"
                        >
                            <LogOut className="size-4"/>Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

        <Collapsible open={open} onOpenChange={setOpen} className="fixed left-0 top-0 z-20 h-dvh">
            <CollapsibleContent forceMount>
                <div className={`bg-background fixed top-0 left-0 h-screen w-64 border p-4 transition duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="flex items-center justify-between">
                        <h1 className="font-semibold">Admin Dashboard</h1>
                        <CollapsibleTrigger asChild className="ml-5">
                            <Button size={"icon"} variant={"outline"}>
                                <ChevronLeft/>
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <Separator className="my-2"/>
                    <div className="mt-4">
                        {ROUTE_GROUPS.map((routeGroup) => (
                            <RouteGroup {...routeGroup} key={routeGroup.group}/>
                        ))}

                    </div>
                </div>
            </CollapsibleContent>
        </Collapsible>
        <main className={`transition-all mt-14 p-4 flex-1 duration-300 ${open ? "translate-x-64" : "translate-x-0"}`}>
            {children}
        </main>
        
    </div>
    
  )
};

export default DashboardLayout;

import { DashboardTable } from "@/component/dashboard/DashboardTable";
import useAuthStore from "@/stores/useAuthStore";
import { History, Leaf, Shuffle } from "lucide-react";

export const Overview = () => {
	const user = useAuthStore((s) => s.user);
	return (
		<div className="py-5 px-10 overflow-hidden">
			<div className="flex items-center justify-between">
				<div className="">
					<h1 className="text-4xl font-bold text-white flex gap-2 items-center">
						Welcome back, {user?.username}{" "}
						<Leaf color="var(--color-custom)" />
					</h1>
					<p className="text-secondary p-1">
						Ready to plant some more trees today?
					</p>
				</div>
				<button className="flex gap-2 bg-custom px-4 py-3 rounded-full shadow-[0_0_10px] shadow-custom font-bold cursor-pointer items-center">
					<Shuffle /> Start Random Quiz
				</button>
			</div>
			<div className="">
				
			</div>
			<div className="p-4">
				<h1 className="text-xl mb-4 text-white font-bold flex items-center gap-2">
					<History color="var(--color-custom)" /> Recent Harvest
				</h1>
				<DashboardTable />
			</div>
		</div>
	);
};

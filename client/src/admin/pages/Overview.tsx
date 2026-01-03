import { DashboardCard } from "@/component/dashboard/DashboardCard";
import { DashboardProfileCard } from "@/component/dashboard/DashboardProfileCard";
import useAuthStore from "@/stores/useAuthStore";
import { Droplet, Leaf, PlayCircle, Plus, Shapes, Trees, Users } from "lucide-react";

export const Overview = () => {
    const user = useAuthStore((s) => s.user);
    
	return (
		<div className="py-5 px-10 overflow-hidden">
			<div className="flex items-center justify-between">
				<div className="">
					<h1 className="text-4xl font-bold text-white flex gap-2 items-center">
						Dashboard Overview <Leaf color="var(--color-custom)" />
					</h1>
					<p className="text-secondary p-1">
						Ready to plant some more trees today?
					</p>
				</div>
				<button className="flex gap-2 bg-custom px-4 py-3 rounded-full shadow-[0_0_10px] shadow-custom font-bold cursor-pointer items-center">
					<Plus /> Create New Quiz
				</button>
			</div>
			<div className="mt-5 p-5 flex gap-5">
				<DashboardProfileCard
					progress={(5/12) * 100}
					tag="Admin"
                    progressInfo={`5/12`}
					extraInfo="create dashboard"
					name={user?.username}
					subtitle="Super Administrator"
				/>
				<DashboardCard
					icon={<Users />}
					title="Total Users"
					value={0}
					id="total"
				/>
				<DashboardCard
					icon={<Shapes />}
					title="Accuracy"
					value={0}
					id="quizzes taken"
				/>
				<DashboardCard
					icon={<PlayCircle />}
					title="Accuracy"
					value={0}
					id="quiz_play"
				/>
			</div>{" "}
		</div>
	);
};

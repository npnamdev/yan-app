import { BarChatDemo } from "@/components/BarChatDemo";
import { BarChatDemo2 } from "@/components/BarChatDemo2";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashBoardPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 py-2 md:py-4 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Card 1 */}
                <div className="flex items-center p-4 bg-white rounded-xl shadow border">
                    <div className="p-3 bg-blue-500 text-white rounded-lg">
                        📈
                    </div>
                    <div className="ml-4">
                        <p className="text-gray-500 text-sm">Total Sales</p>
                        <p className="text-lg font-semibold">$12,450</p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="flex items-center p-4 bg-white rounded-xl shadow border">
                    <div className="p-3 bg-green-500 text-white rounded-lg">
                        👤
                    </div>
                    <div className="ml-4">
                        <p className="text-gray-500 text-sm">New Users</p>
                        <p className="text-lg font-semibold">1,230</p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="flex items-center p-4 bg-white rounded-xl shadow border">
                    <div className="p-3 bg-yellow-500 text-white rounded-lg">
                        🛒
                    </div>
                    <div className="ml-4">
                        <p className="text-gray-500 text-sm">Orders</p>
                        <p className="text-lg font-semibold">320</p>
                    </div>
                </div>

                {/* Card 4 */}
                <div className="flex items-center p-4 bg-white rounded-xl shadow border">
                    <div className="p-3 bg-red-500 text-white rounded-lg">
                        💰
                    </div>
                    <div className="ml-4">
                        <p className="text-gray-500 text-sm">Revenue</p>
                        <p className="text-lg font-semibold">$8,750</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-2 lg:gap-4">
                <BarChatDemo />
                <BarChatDemo2 />
            </div>
        </div>
    );
}

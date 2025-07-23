import IncidentPlayer from "./IncidentPlayer";
import IncidentList from "./IncidentList";

export default function Dashboard() {
  return (
    <div className="flex w-full p-6 gap-4 h-[500px]">
        <IncidentPlayer />
        <IncidentList />
    </div>
  );
}

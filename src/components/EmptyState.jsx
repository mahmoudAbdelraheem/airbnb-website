import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Heading from "./Heading";

const EmptyState = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
}) => {
  const nav = useNavigate();
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading center={true} title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline={true}
            label="Remove all filters"
            onClick={() => nav("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;

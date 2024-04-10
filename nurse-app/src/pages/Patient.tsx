import AlertList from "../components/AlertList";
import DailyTipsList from "../components/DailyTipsList";
import VitalSignList from "../components/VitalSignList";

const Patient = () => {
    return (
        <>
            <VitalSignList />
            <DailyTipsList />
            <AlertList />
        </>
    );
};

export default Patient;

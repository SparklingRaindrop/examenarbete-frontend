import DailyPlan from './DailyPlan';

type Props = {
    filteredPlans: Plan[][];
}

export default function Plans(props: Props) {
    const { filteredPlans } = props;
    return (
        <>
            {
                filteredPlans.map((plans, _, array) => (
                    <div key={plans[0].id}>
                        {array.length > 1 && (<div>{new Date(plans[0].date).toDateString()}</div>)}
                        <DailyPlan plans={plans} />
                    </div>
                ))
            }
        </>
    )
}
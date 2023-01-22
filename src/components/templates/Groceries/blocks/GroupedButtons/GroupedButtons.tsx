import { useGroceriesContext } from '../../../../../hooks';
import { Button, IconButton } from '../../../../elements';
import { Flex } from '../styled';

type Props = {}
export default function GroupedButtons({ }: Props) {
    const { generateGroceries, removeAllGroceries } = useGroceriesContext();

    return (
        <Flex>
            <Button
                label='Generate from meal plan'
                onClick={() => generateGroceries()} />
            <IconButton name='threeDots' variant='ghost' />
            <Button label='clear' onClick={removeAllGroceries} />
            <Button label='Remove marked' onClick={() => removeAllGroceries({ isChecked: true })} />
        </Flex>
    );
}
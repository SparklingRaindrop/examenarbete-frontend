import { useGroceriesContext } from '../../../../../hooks';
import { Button, IconButton } from '../../../../elements';
import { Flex } from '../styled';

type Props = {}
export default function GroupedButtons({ }: Props) {
    const { generateGroceries } = useGroceriesContext();
    return (
        <Flex>
            <Button
                label='Generate from meal plan'
                onClick={() => generateGroceries()} />
            <IconButton name='threeDots' variant='ghost' />
        </Flex>
    );
}
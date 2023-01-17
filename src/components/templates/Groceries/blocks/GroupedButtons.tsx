import { Button, IconButton } from '../../../elements';
import { Flex } from './styled';

type Props = {}
export default function GroupedButtons({ }: Props) {
    return (
        <Flex>
            <Button label='Generate from meal plan' />
            <IconButton name='threeDots' variant='ghost' />
        </Flex>
    );
}
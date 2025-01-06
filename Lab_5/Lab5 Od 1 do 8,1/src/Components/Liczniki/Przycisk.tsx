
type PrzyciskProps = {
    add: Function;
    stan: number;
};

const Przycisk: React.FC<PrzyciskProps> = ({add, stan}) => {
    return (
        <button onClick={() => add(stan+1)}>Dodaj</button>
    );
};

export default Przycisk;
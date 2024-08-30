import {Dispatch, SetStateAction, useState} from 'react';

type Props = {
    arr: { value: string, label: string }[],
    value: string,
    setValue: Dispatch<SetStateAction<string>>;
}

const MainSelect = (props: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className="select">
            <div className="select__header" onClick={() => setIsOpen((s) => !s)}></div>
            {isOpen
                && props.arr.map((item: { value: string, label: string }, index: number) => {
                    return <div
                        key={index}
                        className="select__options"
                        onClick={() => props.setValue(item.value)}>
                        {item.label}
                    </div>
                })}
        </div>
    );
};

export default MainSelect;
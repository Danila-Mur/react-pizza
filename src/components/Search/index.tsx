import React, { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import { setSearchValue } from '../../redux/slices/filterSlice';
import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';

const Search = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const onClickClear = () => {
        dispatch(setSearchValue(''));
        setValue('');
        inputRef.current?.focus();
    };

    const updateSearchValue = useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str));
        }, 250),
        []
    );

    const onChangeInput = (event: any) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    };

    return (
        <div className={styles.root}>
            <svg
                className={styles.icon}
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title />
                <g data-name="1" id="_1">
                    <path d="M221.12,389.43A173.22,173.22,0,0,1,98.25,338.61c-67.75-67.75-67.75-178,0-245.74s178-67.75,245.74,0A173.69,173.69,0,0,1,221.12,389.43Zm0-317.39a143.37,143.37,0,0,0-101.66,42c-56,56.06-56,147.26,0,203.32A143.77,143.77,0,1,0,322.78,114.08h0A143.35,143.35,0,0,0,221.12,72Z" />
                    <path d="M221.12,332.16a116.42,116.42,0,1,1,82.36-34.06A116.1,116.1,0,0,1,221.12,332.16Zm0-202.86a86.44,86.44,0,1,0,61.15,25.29A86.22,86.22,0,0,0,221.12,129.3Z" />
                    <path d="M414.82,450.44a40.78,40.78,0,0,1-29-12L302.89,355.5a15,15,0,0,1,21.22-21.22L407,417.21a11,11,0,1,0,15.55-15.55l-82.93-82.93a15,15,0,1,1,21.22-21.22l82.93,82.93a41,41,0,0,1-29,70Z" />
                </g>
            </svg>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={styles.input}
                type="text"
                placeholder="Поиск пиццы..."
            />
            {value && (
                <svg
                    onClick={onClickClear}
                    className={styles.clearIcon}
                    height="512px"
                    version="1.1"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                </svg>
            )}
        </div>
    );
};

export default Search;

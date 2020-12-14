import React from 'react';
import { Button, Flex } from 'rebass';

import Check from '../../images/check.svg';
import Trash from '../../images/trash.svg';

export default function CaseCard(props) {

    const handleShowCase = () => {
        props.caseToShow(props.caseName, props.caseDescription, props.createdAt);
        props.history.push('/case');
    };

    return (
        <Flex variant='background' width={400} height={71}>
            <Button
                variant='success'
                width={50}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ':hover': { cursor: 'pointer' } }}
                onClick={() => props.checkCase(props.id, props.caseCheck)}
            >
                {props.caseCheck && <img src={Check} alt='check' />}
            </Button>
            <Button
                variant='success'
                width={300}
                textAlign={"center"}
                p={2}
                fontSize={20}
                sx={{ ':hover': { cursor: 'pointer' } }}
                onClick={handleShowCase}
            >
                {props.caseName}
            </Button>
            <Button
                variant='danger'
                width={50}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ':hover': { cursor: 'pointer' } }}
                onClick={() => props.deleteCase(props.id)}
            >
                <img src={Trash} alt='trash' />
            </Button>
        </Flex>
    )
}
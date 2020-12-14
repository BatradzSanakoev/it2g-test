import React from 'react';
import { Box, Button, Text, Flex } from 'rebass';
import { ThemeProvider } from 'theme-ui';
import ReactShadowScroll from 'react-shadow-scroll';
import { Label, Radio } from '@rebass/forms';

import CaseCard from '../CaseCard/CaseCard';

export default function CasesList({ theme, isLoadComplete, cases, deleteCase, checkCase, filterCases, openPopup, history, caseToShow }) {

    const [radio, setRadio] = React.useState('all');
    const radioChange = (e) => {
        const target = e.target;
        if (target.value === 'all') setRadio(target.value);
        else if (target.value === 'check') setRadio(target.value);
        else setRadio(target.value);
    };

    React.useEffect(() => {
        filterCases(radio);
    }, [radio]);

    return (
        <ThemeProvider theme={theme}>
            <Flex variant='styles.th' width={1} px={3} flexDirection={"column"} justifyContent={"space-evenly"} alignItems={"center"}>
                <Text fontSize={24}>ToDo List</Text>
                <Box as='form' noValidate my={2} width={500} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Label justifyContent={"center"}>
                        <Radio name='checked' value='all' onChange={radioChange} checked={radio === 'all'} sx={{ ':hover': { cursor: 'pointer' } }} />
                        All
                    </Label>
                    <Label justifyContent={"center"}>
                        <Radio name='checked' value='check' onChange={radioChange} checked={radio === 'check'} sx={{ ':hover': { cursor: 'pointer' } }} />
                        Checked
                    </Label>
                    <Label justifyContent={"center"}>
                        <Radio name='checked' value='uncheck' onChange={radioChange} checked={radio === 'uncheck'} sx={{ ':hover': { cursor: 'pointer' } }} />
                        Unchecked
                    </Label>
                </Box>
                <ReactShadowScroll isShadow={false} scrollColor={'rgba(242, 95, 92, .1)'}>
                    <Box
                        mt={3}
                        width={1}
                        sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '3', justifyItems: 'center', maxHeight: '58vh' }}
                    >
                        {isLoadComplete && cases.map(({ ...props }, index) =>
                            <CaseCard
                                key={index}
                                {...props}
                                deleteCase={deleteCase}
                                checkCase={checkCase}
                                filterCases={filterCases}
                                radio={radio}
                                history={history}
                                caseToShow={caseToShow}
                            />)}
                    </Box>
                </ReactShadowScroll>
                <Button variant='danger' width={200} height={50} mt={3} sx={{ ':hover': { cursor: 'pointer' } }} onClick={openPopup}>
                    Create new case
                </Button>
            </Flex>
        </ThemeProvider>
    )
}
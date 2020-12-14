import React from 'react';
import { Text, Flex } from 'rebass';
import { ThemeProvider } from 'theme-ui';
import { Link } from 'react-router-dom';

export default function CaseToShow({ theme, showCase }) {
    return (
        <ThemeProvider theme={theme}>
            <Flex variant='styles.th' width={1} px={3} flexDirection={"column"} justifyContent={"space-around"} alignItems={"center"} sx={{ height: '75vh' }}>
                <Text fontSize={24}>{showCase.caseName}</Text>
                <Text fontSize={22} width={2 / 3} textAlign={"center"}>{showCase.caseDescription}</Text>
                <Text fontSize={20}>{showCase.createdAt}</Text>
                <Link to='/'>Back</Link>
            </Flex>
        </ThemeProvider>
    )
}
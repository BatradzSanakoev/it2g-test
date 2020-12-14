import React from 'react';
import { Box, Heading, Text, Flex } from 'rebass';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import { Route, Switch, useHistory } from 'react-router-dom';

import Api from '../../utils/Api';
import Preloader from '../Preloader/Preloader';
import CasesList from '../CasesList/CasesList';
import Popup from '../Popup/Popup';
import CaseToShow from '../CaseToShow/CaseToShow';

function App() {

  const history = useHistory();
  const [cases, setCases] = React.useState({});
  const [isLoadComplete, setIsLoadComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadError, setIsLoadError] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [showCase, setShowCase] = React.useState({});

  const getCases = () => {
    setIsLoadComplete(false);
    setIsLoading(true);
    Api.getCases()
      .then((res) => {
        setCases(res);
        setIsLoadComplete(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadError(true);
      });
  };

  React.useEffect(() => {
    getCases();
  }, []);

  const deleteCase = (caseId) => {
    Api.deleteCase(caseId)
      .then(() => {
        setCases(cases.filter(c => c.id !== caseId));
      })
      .catch((err) => console.log(err));
  };

  const checkCase = (id, caseCheck) => {
    Api.editCase({ id, caseCheck: !caseCheck })
      .then((newCase) => {
        const newCases = cases.map((c) => c.id === id ? newCase : c);
        setCases(newCases);
      })
      .catch((err) => console.log(err));
  };

  const filterCases = (value) => {
    Api.getCases()
      .then((res) => {
        if (value === 'all') setCases(res);
        if (value === 'check') setCases(res.filter(c => c.caseCheck === true));
        if (value === 'uncheck') setCases(res.filter(c => c.caseCheck === false));
      })
      .catch((err) => console.log(err));
  };

  const openPopup = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const createCase = (name, description) => {
    Api.createCase(name, description)
      .then((newCase) => setCases([...cases, newCase]))
      .catch((err) => console.log(err));
  };

  const caseToShow = (caseName, caseDescription, createdAt) => {
    setShowCase({ caseName: caseName, caseDescription: caseDescription, createdAt: createdAt });
  };

  return (
    <ThemeProvider theme={theme}>
      <Popup isOpen={isOpen} onClose={onClose} theme={theme} createCase={createCase} />

      <Flex variant='styles.root' width={1} flexDirection={"column"} justifyContent={"flex-start"} alignItems={"center"} sx={{ height: '100vh' }}>

        <Heading variant='styles.td' backgroundColor='primary' width={1} minHeight={100} display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Text color='background' fontSize={32} onClick={() => history.push('/')} sx={{ ':hover': { cursor: 'pointer' } }}>it2g-test</Text>
        </Heading>

        <Switch>

          <Route exact path='/'>

            <Preloader isLoadError={isLoadError} isLoading={isLoading} />
            <CasesList
              theme={theme}
              isLoadComplete={isLoadComplete}
              cases={cases}
              deleteCase={deleteCase}
              checkCase={checkCase}
              filterCases={filterCases}
              openPopup={openPopup}
              history={history}
              caseToShow={caseToShow}
            />

          </Route>

          <Route path='/case'>
            <Preloader isLoadError={isLoadError} isLoading={isLoading} />
            <CaseToShow theme={theme} showCase={showCase} />
          </Route>

        </Switch>

        <Box as='footer' variant='styles.td' backgroundColor='primary' width={1} minHeight={100} display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Text color='background'>©2020 it2g-test</Text>
        </Box>

      </Flex>
    </ThemeProvider>
  );
}

export default App;

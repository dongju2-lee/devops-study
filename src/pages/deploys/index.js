// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Import the Arrow Forward Icon
import MoveIssueDialog from './moveIssueDialog'

const DeployIusse = () => {
    const [backlogIssueData, setbacklogIssueData] = useState([]);
    const [stgIssueData, setStgIssueData] = useState([]);
    const [prdIssueData, setPrdIssueData] = useState([]);
    const [rollbackIssueData, setRollbackIssueData] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedIssueIndex, setSelectedIssueIndex] = useState(null);
    const [destinationSection, setDestinationSection] = useState('');

  useEffect(() => {
    // 페이지가 로드될 때 API 호출
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
      try {
      const response = await fetch('http://localhost:3002/github/dongju2-lee/action-test/labels');
      const data = await response.json();
      var backlogArray = [];
      var prdArray = [];
      var stgArray = [];
      var rollbackArray = [];

      for(const key in Object.keys(data)) {
       if(data[key].labels == "backlog"){
        backlogArray.push(data[key].title);
       }
       if(data[key].labels == "prd"){
        prdArray.push(data[key].title);
       }
       if(data[key].labels == "stg"){
        stgArray.push(data[key].title);
       }
       if(data[key].labels == "rollback"){
        rollbackArray.push(data[key].title);
       }
      }
      setbacklogIssueData(backlogArray);
      setStgIssueData(prdArray);
      setPrdIssueData(stgArray);
      setRollbackIssueData(rollbackArray);

    } catch (error) {
      console.error('Failed to fetch issues:', error);
    }
  };

  const moveIssueToStg = (issueIndex) => {
    const movedIssue = backlogIssueData[issueIndex];
    const updatedBacklog = [...backlogIssueData];
    const updatedStg = [...stgIssueData, movedIssue];
    updatedBacklog.splice(issueIndex, 1);
    setbacklogIssueData(updatedBacklog);
    setStgIssueData(updatedStg);
  };

  const moveIssueToPrd = (issueIndex) => {
    setSelectedIssueIndex(issueIndex);
    setDestinationSection('prd');
    setOpenDialog(true);
  };

  const moveIssueToRollback = (issueIndex) => {
    setSelectedIssueIndex(issueIndex);
    setDestinationSection('rollback');
    setOpenDialog(true);
  };

  const handleMoveConfirmed = () => {
    if (destinationSection === 'prd') {
      const movedIssue = stgIssueData[selectedIssueIndex];
      const updatedStg = [...stgIssueData];
      const updatedPrd = [...prdIssueData, movedIssue];
      updatedStg.splice(selectedIssueIndex, 1);
      setStgIssueData(updatedStg);
      setPrdIssueData(updatedPrd);
    } else if (destinationSection === 'rollback') {
      const movedIssue = prdIssueData[selectedIssueIndex];
      const updatedPrd = [...prdIssueData];
      const updatedRollback = [...rollbackIssueData, movedIssue];
      updatedPrd.splice(selectedIssueIndex, 1);
      setPrdIssueData(updatedPrd);
      setRollbackIssueData(updatedRollback);
    }
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Grid container spacing={12}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='https://github.com/dongju2-lee/action-test/issues' target='_blank'>
            Issue 현황 
          </Link>
        </Typography>
        <Typography variant='body1'>Repo 선택하기:</Typography>
        
      </Grid>
      {/* 각 이슈를 카드로 표시 */}


      <Grid container spacing={6} >
      {/* 첫 번째 열: Backlog */}
      <Grid item xs={12} md={6} lg={3} sx={{padding: '10px' ,border: '1px solid black'}} >
        <Typography variant='h5'>Backlog</Typography>
        {/* Backlog에 해당하는 카드 아이템들 */}
        {backlogIssueData.map((issue, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>{issue}</Typography> 
                  <Button onClick={() => moveIssueToStg(index) }> {/* 버튼으로 감싸고 클릭 이벤트를 추가합니다. */}
                     <ArrowForwardIcon /> <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
                  </Button>
                 
                </CardContent>
              </Card>
            </Grid>
        ))}
        
      </Grid>
      {/* 두 번째 열: Stg Issue */}
      <Grid item xs={12} md={6} lg={3} sx={{padding: '10px',border: '1px solid black'}}>
        <Typography variant='h5'>STG Issue</Typography>
        {/* Stg Issue에 해당하는 카드 아이템들 */}
        {stgIssueData.map((issue, index) => (
        <Grid item xs={12} key={index}>
          <Card>
            <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>{issue}</Typography>
               <Button onClick={() => moveIssueToPrd(index)}> {/* 버튼으로 감싸고 클릭 이벤트를 추가합니다. */}
                  <ArrowForwardIcon /> <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
               </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
      </Grid>

      <Grid item xs={12} md={6} lg={3} sx={{padding: '10px',border: '1px solid black'}}>
        <Typography variant='h5'>PRD Issue</Typography>
        {/* Stg Issue에 해당하는 카드 아이템들 */}
        {prdIssueData.map((issue, index) => (
        <Grid item xs={12} key={index}>
          <Card>
            <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>{issue}</Typography>
              <Button onClick={() => moveIssueToRollback(index)}> {/* 버튼으로 감싸고 클릭 이벤트를 추가합니다. */}
                     <ArrowForwardIcon /> <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
      </Grid>

      <Grid item xs={12} md={6} lg={3} sx={{padding: '10px',border: '1px solid black'}}>
        <Typography variant='h5'>Rollback</Typography>
        {/* Stg Issue에 해당하는 카드 아이템들 */}
        {rollbackIssueData.map((issue, index) => (
        <Grid item xs={12} key={index}>
          <Card>
            <CardContent>
              <Typography>{issue}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      </Grid>
      {/* PRD Issue, Rollback Issue도 유사하게 처리 */}
    </Grid>

    <MoveIssueDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleMoveConfirmed}
    />

    </Grid>
  );
}

export default DeployIusse

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import React, { useEffect, useState } from 'react'

import Card from '@mui/material/Card';

const DeployIusse = () => {
    const [issues, setIssues] = useState([]);

  useEffect(() => {
    // 페이지가 로드될 때 API 호출
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await fetch('http://localhost:3002/github/dongju2-lee/action-test/issues');
      const data = await response.json();
      console.log("이슈를 호출 : ")
      setIssues(data.issues); // 받아온 데이터 중 issues만 사용
    } catch (error) {
      console.error('Failed to fetch issues:', error);
    }
  };

  // return (
  //   <Grid container spacing={6}>
  //     <Grid item xs={12}>
  //       <Typography variant='h5'>
  //         <Link href='https://github.com/dongju2-lee/action-test/issues' target='_blank'>
  //           issue 현황
  //         </Link>
  //       </Typography>
  //      </Grid>
  //     <Grid item xs={12}>
  //       <Grid container spacing={6}>
         
  //       </Grid>
  //     </Grid>
  //   </Grid>
  // )
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='https://github.com/dongju2-lee/action-test/issues' target='_blank'>
            Issue 현황
          </Link>
        </Typography>
      </Grid>
      {/* 각 이슈를 카드로 표시 */}
      {issues.map((issue, index) => (
        <Grid item xs={12} key={index}>
          <Card>
            <CardContent>
              <Typography>{issue}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default DeployIusse

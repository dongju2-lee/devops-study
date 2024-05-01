// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import ServiceBoard from 'src/views/mainDashboard/serviceBoard'
import K8sBoard from 'src/views/mainDashboard/K8sBoard'
import DeployBoard from 'src/views/mainDashboard/deployBoard'
import AlertBoard from 'src/views/mainDashboard/alertBoard'

const MainDashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={10}>
        
        
        <Grid item xs={12} md={12} lg={12}>
          <K8sBoard />
        </Grid>  <Grid item xs={12} md={12} lg={12}>
          <ServiceBoard />
        </Grid>  <Grid item xs={12} md={12} lg={12}>
          <DeployBoard />
        </Grid>  <Grid item xs={12} md={12} lg={12}>
          <AlertBoard />
        </Grid>
       
      </Grid>
    </ApexChartWrapper>
  )
}

export default MainDashboard

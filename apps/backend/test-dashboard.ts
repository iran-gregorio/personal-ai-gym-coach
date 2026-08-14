import { dashboardService } from './src/modules/dashboard/dashboard.service';
dashboardService.getDashboardData('fake-user-id', '2023-10-25').then(console.log).catch(console.error);

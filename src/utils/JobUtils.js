module.exports = {
    remainingDays(job) {
      //cálculo de tempo restante
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
      const createdDate = new Date(job.created_at);
      const dueDay = createdDate.getDate() + Number(remainingDays);
      const dueDateInMs = createdDate.setDate(dueDay);
      const timeDiffInMins = dueDateInMs - Date.now();
      //transformar ms em dias
      const daysInMs = 1000 * 60 * 60 * 24;
      const dayDiff = Math.ceil(timeDiffInMins / daysInMs);

      // restam x dias
      return dayDiff;
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
  }
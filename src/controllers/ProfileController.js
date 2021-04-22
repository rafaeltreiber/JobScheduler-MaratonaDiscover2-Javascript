const Profile = require('../model/Profile');

module.exports = {
    async index(req, res) {
      return res.render("profile", { profile: await Profile.get() });
    },
    async update(req, res) {
      //req.body para pegar os dados
      const data = req.body;
      //definir quantas semanas tem no ano
      const weeksPerYear = 52;
      //remover as semanas de férias do ano para pegar quantas semanas tem em um mês
      const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
      //quantas horas por semana estou trabalhando
      const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
      //total de horas trabalhadas no mês
      const monthyTotalHours = weekTotalHours * weeksPerMonth;
      //qual será o valor dda minha hora
      const valueHour = data["monthly-budget"] / monthyTotalHours;

      const profile = await Profile.get()

      // Atualizamos os campos do profile
      await Profile.update({
          // espalha todos os campos de Profile
        ...profile,
        //acrescenta com os campos do req.body. Os campos do profile que existirem no req.body
        //serão substituídos pois o req.body vem depois do Profile. Os campos novos serão
        //acrescentados
        ...req.body,
        "value-hour": valueHour,
      }) 

      return res.redirect("/profile");
    },
  }
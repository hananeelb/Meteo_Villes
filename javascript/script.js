document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('searchBtn');

  btn.addEventListener('click', function () {
    const ville = document.getElementById('ville').value.trim();

    if (ville === '') {
      document.getElementById('resultat').innerHTML = '<p class="text-danger">Veuillez entrer une ville.</p>';
      return;
    }

    fetch(`./php/meteo.php?ville=${encodeURIComponent(ville)}`)
      .then(response => {
        if (!response.ok) throw new Error('Erreur réseau');
        return response.json();
      })
      .then(data => {
        console.log('Données reçues :', data);

        if (data.cod === "404") {
          document.getElementById("resultat").innerHTML = `<p class="text-warning">Ville non trouvée.</p>`;
        } else if (data.cod !== 200 && data.cod !== "200") {
          document.getElementById("resultat").innerHTML = `<p class="text-danger">Erreur : ${data.message}</p>`;
        } else {
          document.getElementById("resultat").innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
  <p>
    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" />
    ${data.weather[0].description}
  </p>
  <p>Température : ${data.main.temp}°C</p>
  <p>Humidité : ${data.main.humidity}%</p>
          `;
        }
      })
      .catch(error => {
        console.error('Erreur attrapée :', error);
        document.getElementById('resultat').innerHTML = `<p class="text-danger">Erreur de connexion.</p>`;
      });
  });
});

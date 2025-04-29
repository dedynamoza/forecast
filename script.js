const services = [
  { name: "Biznet Home Internet 0DS", fee: 250000 },
  { name: "Biznet Home Internet 1DS", fee: 350000 },
  { name: "Biznet Home Internet 2DS", fee: 550000 },
  { name: "Biznet Home Gamers 3DS", fee: 650000 },
  { name: "Biznet Home Internet 0D", fee: 175000 },
  { name: "Biznet Home Internet 1D", fee: 375000 },
  { name: "Biznet Home Internet 2D", fee: 575000 },
  { name: "Biznet Home Gamers 3D", fee: 700000 },
  { name: "Biznet Metronet 1DS", fee: 1150000 },
  { name: "Biznet Metronet 2DS", fee: 2000000 },
  { name: "Biznet Metronet 3DS", fee: 3250000 },
  { name: "Biznet Metronet 1D", fee: 1000000 },
  { name: "Biznet Metronet 2D", fee: 1700000 },
  { name: "Biznet Metronet 3D", fee: 2700000 },
  { name: "Biznet Metronet 4D", fee: 6500000 },
  { name: "Biznet Metronet 5D", fee: 12500000 },
  { name: "Biznet Home Internet 0DS Rent", fee: 300000 },
  { name: "Biznet Home Internet 1DS Rent", fee: 400000 },
  { name: "Biznet Home Internet 2DS Rent", fee: 600000 },
  { name: "Biznet Home Gamers 3DS Rent", fee: 700000 },
  { name: "Biznet Home Internet 0D Rent", fee: 300000 },
  { name: "Biznet Home Internet 1D Rent", fee: 425000 },
  { name: "Biznet Home Internet 2D Rent", fee: 625000 },
  { name: "Biznet Home Gamers 3D Rent", fee: 750000 },
  { name: "Biznet Metronet 1DS Rent", fee: 1200000 },
  { name: "Biznet Metronet 2DS Rent", fee: 2050000 },
  { name: "Biznet Metronet 3DS Rent", fee: 3300000 },
  { name: "Biznet Metronet 1D Rent", fee: 1050000 },
  { name: "Biznet Metronet 2D Rent", fee: 1750000 },
  { name: "Biznet Metronet 3D Rent", fee: 2750000 },
  { name: "Biznet Metronet 4D Rent", fee: 6550000 },
  { name: "Biznet Metronet 5D Rent", fee: 12550000 }
];

function formatNumberInput(input) {
  input.addEventListener('input', function () {
    let value = this.value.replace(/\D/g, '');
    this.value = value ? parseInt(value).toLocaleString('id-ID') : '';
  });
}

window.onload = function () {
  const select = document.getElementById("service");
  services.forEach((service, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.text = service.name;
    select.appendChild(option);
  });

  formatNumberInput(document.getElementById('revenue'));
  formatNumberInput(document.getElementById('target'));
};

function getRandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
}

function calculate() {
  const revenue = parseInt(document.getElementById("revenue").value.replace(/\./g, '').replace(',', '')) || 0;
  const target = parseInt(document.getElementById("target").value.replace(/\./g, '').replace(',', '')) || 0;
  const comboValue = document.getElementById("comboSelect").value;
  const selectedOptions = Array.from(document.getElementById("service").selectedOptions);
  const selectedServices = selectedOptions.map(opt => services[opt.value]);

  const kekurangan = Math.max(target - revenue, 0);
  const resultBody = document.getElementById("resultBody");
  resultBody.innerHTML = "";

  if (selectedServices.length === 0 || kekurangan === 0) {
    document.getElementById("totalRevenue").textContent = "0";
    document.getElementById("targetPercent").textContent = "0%";
    return;
  }

  let totalRevenue = 0;
  let remaining = kekurangan;
  const hasil = [];

  for (let i = 0; i < selectedServices.length; i++) {
    const service = selectedServices[i];
    let qty = 0;
    let fee = service.fee;
    let label = service.name;

    if (comboValue === "mix") {
      const random = Math.random();
      if (random < 0.5) {
        fee = service.fee;
        label = service.name;
      } else {
        const combos = ["3+1", "6+2", "9+3", "12+5"];
        const selectedCombo = combos[Math.floor(Math.random() * combos.length)];
        const multiplier = parseInt(selectedCombo.split("+")[0]);
        fee = service.fee * multiplier;
        label = service.name + " " + selectedCombo;
      }
    } else {
      const multiplier = comboValue.includes("+") ? parseInt(comboValue.split("+")[0]) : 1;
      fee = service.fee * multiplier;
      label = comboValue !== "0" ? service.name + " " + comboValue : service.name;
    }

    const maxQty = Math.floor(remaining / fee);
    qty = (i === selectedServices.length - 1)
      ? Math.ceil(remaining / fee)
      : Math.floor(Math.random() * (maxQty + 1));

    const subTotal = fee * qty;
    remaining -= subTotal;
    totalRevenue += subTotal;

    hasil.push({ label, qty, subTotal });
    if (remaining <= 0) break;
  }

  hasil.forEach(({ label, qty, subTotal }) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${qty}</td><td>${label}</td><td>${subTotal.toLocaleString('id-ID')}</td>`;
    resultBody.appendChild(row);
  });

  document.getElementById("totalRevenue").textContent = totalRevenue.toLocaleString('id-ID');
  const percent = target > 0 ? ((revenue + totalRevenue) / target) * 100 : 0;
  document.getElementById("targetPercent").textContent = percent.toFixed(2) + "%";

  const chartBody = document.getElementById("chartBody");
  chartBody.innerHTML = "";
  const totalQty = hasil.reduce((sum, item) => sum + item.qty, 0);

  hasil.forEach((item, index) => {
    const percent = totalQty > 0 ? (item.qty / totalQty) * 100 : 0;
    const color = getRandomColor();

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.label}</td>
      <td>
        <div class="bar" style="width: ${percent}%; background-color: ${color};">
          &nbsp;${percent.toFixed(2)}%
        </div>
      </td>`;
    chartBody.appendChild(row);
  });
}

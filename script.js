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
    input.addEventListener('input', function(e) {
      let value = this.value.replace(/\D/g, '');
      if (value) {
        this.value = parseInt(value).toLocaleString('id-ID');
      } else {
        this.value = '';
      }
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
  
  function calculate() {
    const revenueInput = document.getElementById("revenue").value.replace(/\./g, '').replace(',', '');
    const targetInput = document.getElementById("target").value.replace(/\./g, '').replace(',', '');
  
    const revenue = parseInt(revenueInput) || 0;
    const target = parseInt(targetInput) || 0;
  
    const selectedOptions = Array.from(document.getElementById("service").selectedOptions);
    const selectedServices = selectedOptions.map(opt => services[opt.value]);
  
    const resultBody = document.getElementById("resultBody");
    resultBody.innerHTML = "";
  
    const kekurangan = Math.max(target - revenue, 0);
    const totalFeePerService = selectedServices.reduce((sum, s) => sum + s.fee, 0);
  
    let totalRevenue = 0;
  
    selectedServices.forEach(service => {
      const proportion = service.fee / totalFeePerService;
      const bagianKekurangan = kekurangan * proportion;
      const kuantiti = Math.ceil(bagianKekurangan / service.fee);
  
      const row = document.createElement("tr");
  
      const quantityCell = document.createElement("td");
      quantityCell.textContent = kuantiti;
  
      const nameCell = document.createElement("td");
      nameCell.textContent = service.name;
  
      const feeCell = document.createElement("td");
      feeCell.textContent = (service.fee * kuantiti).toLocaleString('id-ID');
  
      row.appendChild(quantityCell);
      row.appendChild(nameCell);
      row.appendChild(feeCell);
  
      resultBody.appendChild(row);
  
      totalRevenue += service.fee * kuantiti;
    });
  
    document.getElementById("totalRevenue").textContent = totalRevenue.toLocaleString('id-ID');
  
    const combinedRevenue = revenue + totalRevenue;
    const percent = target > 0 ? (combinedRevenue / target) * 100 : 0;
    document.getElementById("targetPercent").textContent = percent.toFixed(2) + '%';
  }
  
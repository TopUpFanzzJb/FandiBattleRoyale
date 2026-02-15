function openMenu(type){
  if(type==="dev"){
    const add = prompt("Tambah Diamond:");
    if(add){ data.diamond += parseInt(add); save(); updateUI(); }
  }
  if(type==="topup"){
    data.diamond += 100;
    save(); updateUI();
    alert("Top Up +100 Diamond (Demo)");
  }
}

function updateUI(){
  level.textContent = data.level;
  coin.textContent = data.coin;
  diamond.textContent = data.diamond;
}

updateUI();

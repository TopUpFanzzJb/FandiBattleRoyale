const data = JSON.parse(localStorage.getItem("FBR")) || {
  level:1, coin:1000, diamond:50,
  weapon:"M4A1", skins:{ head:0, body:0 }
};

function save(){ localStorage.setItem("FBR", JSON.stringify(data)); }

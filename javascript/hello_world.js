function test(){
 document.getElementById("the_box").innerHTML = array2data(OUp(1,1,0.1,normrnd(),100));
}

function replot(){
  var mu = parseFloat(document.getElementById("mu_box").value);
  var sigma = parseFloat(document.getElementById("sigma_box").value);
  var x0 = parseFloat(document.getElementById("x0_box").value);
  var data = array2data(OUp(mu,sigma,0.001,x0,1000));
  var dataset = [{label: "Ornstein-Uhlenbeck Process",data: data,color: "#FF0000"}];
  var options = {
      series: {
          lines: { show: true },
          points: {
              radius: 3,
              show: false
          }
      }
  };
  $(document).ready(function () {
            $.plot($("#flot-placeholder"), dataset, options);
        });
}

function normrnds(n){
  var arr = new Array();
  for (k=0;k<n;k++){
    arr[k] = normrnd();
  }
  return arr
}

function array2string(arr){
  str = arr[0][0] + ', ' + arr[1][0];
  for (k=1; k<arr[0].length; k++){
    str = str + " <br>"  + arr[0][k] + ', ' + arr[1][k];
  }
  return str;

}

function array2data(arr){
  data = [];
  for (k=0; k<arr[0].length; k++){
    data.push([arr[0][k],arr[1][k]]);
  }
  return data;
}

function normrnd(){
  return Math.sqrt(-2*Math.log(Math.random()))*Math.cos(2*Math.PI*Math.random());
}

function OUp(mu,sigma,dt,ic,N){
  arr = new Array();
  arr[0] = new Array();
  arr[1] = new Array();
  
  arr[0][0] = 0;
  arr[1][0] = ic;
  
  c1 = (1 - dt*mu);
  c2 = Math.sqrt(dt)*sigma;
  
  for (k=0;k<N;k++){
  	arr[0][k+1] = arr[0][k] + dt;
    arr[1][k+1] = c1*arr[1][k] + c2*normrnd();
  }
  return arr;
}

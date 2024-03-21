<!-- db connection -->
<?php 
$username = "root";
$password = "";
$database = "budget_db";

try {
  $pdo = new PDO("mysql:host=localhost;database=$database", $username, $password);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e){
  die("ERROR" . $e->getMessage());
}
?>

<!-- html set up, bring in chart.js cdn, copied to handlebars dashboard
<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-US-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <title>Expense Chart</title>
</head> -->

<!-- myChart display -->
<!-- <body>
  <div>
    <canvas id="myChart"></canvas>
  </div>
  <script type="text/php" src="js/chartjs.php"></script>
</body>
</html> -->

<!-- AXAX select query execution, loop through the data -->
<?php
try{
  $sql = "SELECT categories_id as categories_id,
    SUM(amount) as amount
    FROM spends
    GROUP BY categories_id";   
  $result = $pdo->query($sql);
  if($result->rowCount() > 0) {
    $amount = new array();

    while($row = $result->fetch()) {
      $categories_id[] = $data["categories_id"]
      $amount[] = $data["amount"]
    }

  unset($result);
  } else {
    echo "No records";
  }
} catch(PDOException $e){
  die("ERROR $sql. " . $e->getMessage());
}
 
// close connection
unset($pdo);
?>

<!-- define labels and data dynamically from database -->
<script>
const labels = <?php echo json_encode($categories_id) ?>;
const data = {
  labels: labels,
  datasets: [{
    label: 'Spends',
    data: <?php echo json_encode($amount) ?>,
    borderWidth: 1
  }]
};

// bar chart configuration
const config = {
type: 'bar',
data,  
options: {
  scales: {
    y: {
      beginAtZero: true
    }
  }
}
};

// render chart
const myChart = new Chart(,
document.getElementById('myChart'),
config
);

</script>

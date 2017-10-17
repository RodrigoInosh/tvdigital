<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>xlsExport Demo</title>
<link href="https://www.cssscript.com/wp-includes/css/sticky.css" rel="stylesheet" type="text/css">
<script src="js/xls-export.js"></script>
<link href="https://bootswatch.com/superhero/bootstrap.min.css" rel="stylesheet" type="text/css">
</head>
<body>
<div id="css-script-menu">
<div class="css-script-center">
<ul>
<li><a href="http://www.cssscript.com/export-javascript-array-xls-csv-xlsexport/">Download</a></li>
<li><a href="http://www.cssscript.com/">Back To CSS Script</a></li>
</ul>
<div class="css-script-ads">
<script type="text/javascript"><!--
google_ad_client = "ca-pub-2783044520727903";
/* CSSScript Demo Page */
google_ad_slot = "3025259193";
google_ad_width = 728;
google_ad_height = 90;
//-->
</script>
<script type="text/javascript" src="https://pagead2.googlesyndication.com/pagead/show_ads.js">
</script></div>
<div class="css-script-clear"></div>
</div>
</div>
<div class="container" style="margin-top:150px;">
<h1>xlsExport Demo</h1>
<div class="well">const dataSample = [{<br>
&quot;symbol&quot;: &quot;IBM&quot;,<br>
&quot;date&quot;: &quot;Aug 2004&quot;,<br>
&quot;price&quot;: 78.17<br>
},<br>
{<br>
&quot;symbol&quot;: &quot;IBM&quot;,<br>
&quot;date&quot;: &quot;Sep 2004&quot;,<br>
&quot;price&quot;: 79.13<br>
},<br>
{<br>
&quot;symbol&quot;: &quot;IBM&quot;,<br>
&quot;date&quot;: &quot;Oct 2004&quot;,<br>
&quot;price&quot;: 82.84<br>
},<br>
...<br>
];</div>
<input type="button" onclick="xls.exportToXLS('export.xls')" value="Export To XLS" class="btn btn-info">
<input type="button" onclick="xls.exportToCSV()" value="Export To CSV" class="btn btn-danger">
</div>
<script>
  const dataSample = [{
      "symbol": "IBM",
      "date": "Aug 2004",
      "price": 0
    },
    {
      "symbol": "IBM",
      "date": "Sep 2004",
      "price": 0
    },
    {
      "symbol": "IBM",
      "date": "Oct 2004",
      "price": 82.84
    },
    {
      "symbol": "IBM",
      "date": "Nov 2004",
      "price": 87.15
    },
  ];

  const xls = new xlsExport(dataSample, 'Example WB');
  </script>
</body>
</html>
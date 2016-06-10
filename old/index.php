
<!--?php
if(substr($webroot, -1) != '/') $webroot .= '/';

if(isset($_GET['wolf']) && strpos($_GET['wolf'], '/') !== FALSE) header("Location: $webroot" . str_replace('/', '', $_GET['wolf']));

$wolvez = get_all_wolvez();
$index = @url_to_index($_GET['wolf'], $wolvez);
$wolf = $wolvez[$index];
$wolf_info = pathinfo(basename($wolf));

if(!isset($_GET['wolf'])) header("Location: $url");

?-->

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
	<title>LAZER WOLVEZ 4 LIFE</title>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
	<style type="text/css" media="screen">
	</style>
</head>
</script>
<body>

<?php getWolvez(); populate(); ?>

</body>
</html>
<?php 

$GLOBALS['allWolves'] = [];

// get all images in wolvez folder
// if $_GET['url'] not defined, put the latest one on first
function getWolvez() {
	session_start();
	$GLOBALS['allWolves'] = glob('wolvez/*.gif', GLOB_NOSORT);
	array_multisort(array_map('filemtime', $allWolves), SORT_NUMERIC, SORT_DESC, $allWolves);
	console("got wolves");
}

function wolfFile($url) {
	return "wolvez/$url.gif";
}

function populate()
{
	for($index = 0; $index < count($GLOBALS['allWolves']); $index++)
	{

		$wolfgif = $GLOBALS['allWolves'][$index];
		
		$output = 
		'<li>
		<img src="' . $GLOBALS['allWolves'][$index] . '"/>
		<div class="wrapper">
			<div class="wolftitle" >
				<a href="javascript:void(0);">
					<h1>Lorem Ips</h1><br>
					<p>Purple Rain by Prince</p>
				</a>
			</div>
			<a href="javascript:void(0);">
				<div class="wolfgif" style="background: url(' . $GLOBALS['allWolves'][$index] . ')"></div>
			</a>
		</a>
	</li>';
	
	console($index);
	echo $output;
	}
}

function url_to_index($url, $list) {
	$index = @array_search(url_to_file($url), $list);
	return $index? $index : 0;
}

function console( $data ) {

	if ( is_array( $data ) )
		$output = "<script>console.log( 'Debug Objects: " . implode( ',', $data) . "' );</script>";
	else
		$output = "<script>console.log( 'Debug Objects: " . $data . "' );</script>";

	echo $output;
}
?>
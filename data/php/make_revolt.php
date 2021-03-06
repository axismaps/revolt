<?php
	$mysqli = new mysqli( '127.0.0.1', 'root', '', 'revolt' );

	if ($mysqli->connect_errno)
	{
		printf("Connect failed: %s\n", $mysqli->connect_error);
		exit();
	}
	
	$result = $mysqli->query( "SELECT * FROM time" );
	
	$date = array();
	
	while ( $row = $result->fetch_assoc() )
	{
		if( !isset( $date[ $row[ 'DATE' ] ] ) )
		{
			$date[ $row[ 'DATE' ] ] = array();
			$date[ $row[ 'DATE' ] ][ 'DATE' ] = $row[ 'DATE_TEXT' ];
			$date[ $row[ 'DATE' ] ][ 'TEXT' ] = str_replace( array( "&gt;", "&lt;" ), array( ">", "<" ), htmlentities( $row[ 'TEXT' ], ENT_QUOTES ) );
			if( $row[ 'IMAGE' ] != "" )
			{
				$date[ $row[ 'DATE' ] ][ 'IMAGE' ] = $row[ 'IMAGE' ];
			}
			
		}
		else
		{
			if( !isset( $date[ $row[ 'DATE' ] ][ 'STEPS' ] ) )
			{
				$date[ $row[ 'DATE' ] ][ 'STEPS' ] = array();
			}
			array_push( $date[ $row[ 'DATE' ] ][ 'STEPS' ], str_replace( array( "&gt;", "&lt;" ), array( ">", "<" ), htmlentities( $row[ 'TEXT' ], ENT_QUOTES ) ) );
		}
	}
	
	$result->free();
	
	$result = $mysqli->query( "SELECT * FROM points" );
	
	while ( $row = $result->fetch_assoc() )
	{
		if( $row[ 'STEP' ] != 0 )
		{
			foreach ( $row as $key => $value )
			{
				if( $value == "" )
				{
					unset( $row[ $key ] );
				}
			}
			$d = $row[ 'DATE' ];
			unset( $row[ 'DATE' ] );
			$step = $row[ 'STEP' ] - 1;
			unset( $row[ 'STEP' ] );
			unset( $row[ 'UID' ] );
			if ( isset( $row['Fixed'] ) ) unset( $row['Fixed'] );
			if ( isset( $row['Places Notes'] ) ) unset( $row['Places Notes'] );
			if ( isset( $row['Terrain Notes'] ) ) unset( $row['Terrain Notes'] );
			if ( isset( $row['POSITION'] ) ) unset( $row['POSITION'] );
			
			$row[ 'ID' ] = intval( $row[ 'ID' ] );
			$row[ 'CERTAINTY' ] = intval( $row[ 'CERTAINTY' ] );
			$row[ 'VALUE' ] = intval( $row[ 'VALUE' ] );

			if ( isset( $row[ 'PATH' ] ) ){
				$loc = json_decode( $row[ 'PATH' ] );
				unset( $row[ 'LAT1' ] );
				unset( $row[ 'LON1' ] );
				unset( $row[ 'LAT2' ] );
				unset( $row[ 'LON2' ] );
				unset( $row[ 'PATH' ] );
			} else {
				$loc = array();
				array_push( $loc, array( floatval( $row[ 'LAT1' ] ), floatval( $row[ 'LON1' ] ) ) );
				unset( $row[ 'LAT1' ] );
				unset( $row[ 'LON1' ] );
				
				if( $row[ 'LAT2'] && $row[ 'LON2' ] )
				{
					array_push( $loc, array( floatval( $row[ 'LAT2' ] ), floatval( $row[ 'LON2' ] ) ) );
					unset( $row[ 'LAT2' ] );
					unset( $row[ 'LON2' ] );
				}
			}
			$row[ "LOC" ] = $loc;
			if ( $row[ 'TEXT' ] != "" )
				$row[ 'INFO' ] = str_replace( array( "&gt;", "&lt;" ), array( ">", "<" ), htmlentities( $row[ 'TEXT' ] ) );
			$row[ 'TEXT' ] = $date[ $d ][ 'STEPS' ][ $step ];
			
			$date[ $d ][ 'STEPS' ][ $step ] = $row;
		}
	}
	
	//print_r( $date );
	echo json_encode( $date );
?>

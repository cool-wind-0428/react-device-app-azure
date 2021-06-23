import { useForm } from '@fuse/hooks';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeParameterInfoDialog } from '../store/dialogSlice';

const defaultParameters = {
	'PARAMETER_STR' : { 
		P_eindeutigeID:0,
		P_Softwareversion:0,
		P_Sprache:0,
		P_STLift:0,
		P_Display_abschalten:0,
		P_CanBus_2_aktiv:0,
		P_Str_aktualisieren:0,
		P_GUI_Divi:0,
		P_Antriebstyp:0,
		P_Nenngeschwindigkeit:0,
		'P_WartezeitAnfahren/Entprellen':0,
		P_Fahrtzeituberschreitung:0,
		P_Rufverarbeitungstyp:0,
		P_Quickstart:0,
		P_BruckeBeiEinfahrt:0,
		P_Reservierungzeit_Fahrtrichtung:0,
		P_KB_Reservierungzeit_Kabinenrufe:0,
		P_Offset_Bundig:0,
		P_Offset_Evak:0,
		P_Max_Dauer_Evak:0,
		P_Max_Evak_Geschwindigkeit:0,
		P_Nachholung:0,
		'P_Nachholung_Unbundig_>':0,
		P_Nachholungsgeschwindigkeit:0,
		
		P_NudgingBeiInspektion:0,
		P_Begrenzungsoffset_Drosseln:0,
		P_Inspektionsbegrenzung_offset_oben:0,
		P_Inspektionsbegrenzung_offset_unten:0,
		P_Inspektionsgeschwindigkeit:0,
		P_Inspektionsgeschwindigkeit_2:0,
		
		P_GrubeInspektionsbegrenzung_offset_unten:0,
		
		P_Ruckholungsbegrenzung_offset_oben:0,
		P_Ruckholungsgeschwindigkeit:0,
		P_Ruckholungsgeschwindigkeit_2:0,
		
		'Brandfall[0].maxErlaubteTurOffenZeit':0,
		'Brandfall[0].Ruhestellung_Tur':0,
		'Brandfall[0].NO_NC':0,
		'Brandfall[0].Haltestelle':0,
		'Brandfall[0].Zugang':0,
		'Brandfall[0].Nudging':0,
		
		'Brandfall[1].maxErlaubteTurOffenZeit':0,
		'Brandfall[1].Ruhestellung_Tur':0,
		'Brandfall[1].NO_NC':0,
		'Brandfall[1].Haltestelle':0,
		'Brandfall[1].Zugang':0,
		'Brandfall[1].Nudging':0,
		
		'Parkfahrt.Haltestelle':0,
		'Parkfahrt.Zugang':0,
		'Parkfahrt.Timer':0,
		
		'Zufallsrufe.maxAnzahl':0,
		'Zufallsrufe_P_MinZeitBisNeuerRuf':0,
		
		'KBLicht.Abschaltung':0,
		
		P_Bremstest_ohne_UBWK:0,
		P_Bremstest_X_Fahrten:0,
		P_Bremstest_EncDiff:0,
		P_Bremstest_WartezeitVorTest:0,
		P_Bremstest_BremseOffenHalteZeit:0,
		
		P_TurAufLadefunktion:0,
		P_maxLadezeit:0,
		
		P_Ants_vor_Automatik:0,
		P_Ants_vor_Turzonelange:0,
		P_Ants_vor_Inspektionsbegrenzung:0,
		P_Ants_vor_VerzoegerungOben:0,
		P_Ants_vor_VerzoegerungUnten:0,
		P_Ants_vor_Geschwindigkeit:0,
		
		P_Test_Endschalter_offset:0,
		
		P_Spule_GGW_Entprellung:0,
		
		'Gaestesteuerung.Timer':0,
		
		P_AWM_freigeschalten:0,
		P_ADC_Lichtfehler:0,
		P_maxBundigfehler:0,
		P_AWM_NotrufID:0,
		P_AWM_Notrufgeraet:0,
		P_AWM_HearbeatIntervall:0,
		
		P_Relay_1:0,
		P_Relay_2:0,
		'P_HW_Eingang[0]':0,
		'P_HW_Eingang[1]':0,
		'P_HW_Eingang[2]':0,
		'P_HW_Eingang[3]':0,
		'P_HW_Eingang[4]':0,
		'P_HW_Eingang[5]':0,
		
		Micro_0_Input_BASICFUNCTION:0,
		Micro_0_Input_SUBFUNCTION:0,
		Micro_0_Input_LIFT:0,
		Micro_0_Input_FLOOR:0,
		Micro_0_Input_DOOR:0,
		Micro_0_Input_FUNCTIONDATA:0,
		
		Micro_0_Output_BASICFUNCTION:0,
		Micro_0_Output_SUBFUNCTION:0,
		Micro_0_Output_LIFT:0,
		Micro_0_Output_FLOOR:0,
		Micro_0_Output_DOOR:0,
		Micro_0_Output_FUNCTIONDATA:0,
		
		Micro_1_Input_BASICFUNCTION:0,
		Micro_1_Input_SUBFUNCTION:0,
		Micro_1_Input_LIFT:0,
		Micro_1_Input_FLOOR:0,
		Micro_1_Input_DOOR:0,
		Micro_1_Input_FUNCTIONDATA:0,
		
		Micro_1_Output_BASICFUNCTION:0,
		Micro_1_Output_SUBFUNCTION:0,
		Micro_1_Output_LIFT:0,
		Micro_1_Output_FLOOR:0,
		Micro_1_Output_DOOR:0,
		Micro_1_Output_FUNCTIONDATA:0,
		
		Micro_2_Input_BASICFUNCTION:0,
		Micro_2_Input_SUBFUNCTION:0,
		Micro_2_Input_LIFT:0,
		Micro_2_Input_FLOOR:0,
		Micro_2_Input_DOOR:0,
		Micro_2_Input_FUNCTIONDATA:0,
		
		Micro_2_Output_BASICFUNCTION:0,
		Micro_2_Output_SUBFUNCTION:0,
		Micro_2_Output_LIFT:0,
		Micro_2_Output_FLOOR:0,
		Micro_2_Output_DOOR:0,
		Micro_2_Output_FUNCTIONDATA:0,
		
		Micro_3_Input_BASICFUNCTION:0,
		Micro_3_Input_SUBFUNCTION:0,
		Micro_3_Input_LIFT:0,
		Micro_3_Input_FLOOR:0,
		Micro_3_Input_DOOR:0,
		Micro_3_Input_FUNCTIONDATA:0,
		
		Micro_3_Output_BASICFUNCTION:0,
		Micro_3_Output_SUBFUNCTION:0,
		Micro_3_Output_LIFT:0,
		Micro_3_Output_FLOOR:0,
		Micro_3_Output_DOOR:0,
		Micro_3_Output_FUNCTIONDATA:0,
		
		Micro_4_Input_BASICFUNCTION:0,
		Micro_4_Input_SUBFUNCTION:0,
		Micro_4_Input_LIFT:0,
		Micro_4_Input_FLOOR:0,
		Micro_4_Input_DOOR:0,
		Micro_4_Input_FUNCTIONDATA:0,
		
		Micro_4_Output_BASICFUNCTION:0,
		Micro_4_Output_SUBFUNCTION:0,
		Micro_4_Output_LIFT:0,
		Micro_4_Output_FLOOR:0,
		Micro_4_Output_DOOR:0,
		Micro_4_Output_FUNCTIONDATA:0,
		
		Micro_5_Input_BASICFUNCTION:0,
		Micro_5_Input_SUBFUNCTION:0,
		Micro_5_Input_LIFT:0,
		Micro_5_Input_FLOOR:0,
		Micro_5_Input_DOOR:0,
		Micro_5_Input_FUNCTIONDATA:0,
		
		Micro_5_Output_BASICFUNCTION:0,
		Micro_5_Output_SUBFUNCTION:0,
		Micro_5_Output_LIFT:0,
		Micro_5_Output_FLOOR:0,
		Micro_5_Output_DOOR:0,
		Micro_5_Output_FUNCTIONDATA:0,
		
		Micro_6_Input_BASICFUNCTION:0,
		Micro_6_Input_SUBFUNCTION:0,
		Micro_6_Input_LIFT:0,
		Micro_6_Input_FLOOR:0,
		Micro_6_Input_DOOR:0,
		Micro_6_Input_FUNCTIONDATA:0,
		
		Micro_6_Output_BASICFUNCTION:0,
		Micro_6_Output_SUBFUNCTION:0,
		Micro_6_Output_LIFT:0,
		Micro_6_Output_FLOOR:0,
		Micro_6_Output_DOOR:0,
		Micro_6_Output_FUNCTIONDATA:0,
		
		Micro_7_Input_BASICFUNCTION:0,
		Micro_7_Input_SUBFUNCTION:0,
		Micro_7_Input_LIFT:0,
		Micro_7_Input_FLOOR:0,
		Micro_7_Input_DOOR:0,
		Micro_7_Input_FUNCTIONDATA:0,
		
		Micro_7_Output_BASICFUNCTION:0,
		Micro_7_Output_SUBFUNCTION:0,
		Micro_7_Output_LIFT:0,
		Micro_7_Output_FLOOR:0,
		Micro_7_Output_DOOR:0,
		Micro_7_Output_FUNCTIONDATA:0,
		
		Micro_8_Input_BASICFUNCTION:0,
		Micro_8_Input_SUBFUNCTION:0,
		Micro_8_Input_LIFT:0,
		Micro_8_Input_FLOOR:0,
		Micro_8_Input_DOOR:0,
		Micro_8_Input_FUNCTIONDATA:0,
		
		Micro_8_Output_BASICFUNCTION:0,
		Micro_8_Output_SUBFUNCTION:0,
		Micro_8_Output_LIFT:0,
		Micro_8_Output_FLOOR:0,
		Micro_8_Output_DOOR:0,
		Micro_8_Output_FUNCTIONDATA:0,
		
		Micro_9_Input_BASICFUNCTION:0,
		Micro_9_Input_SUBFUNCTION:0,
		Micro_9_Input_LIFT:0,
		Micro_9_Input_FLOOR:0,
		Micro_9_Input_DOOR:0,
		Micro_9_Input_FUNCTIONDATA:0,
		
		Micro_9_Output_BASICFUNCTION:0,
		Micro_9_Output_SUBFUNCTION:0,
		Micro_9_Output_LIFT:0,
		Micro_9_Output_FLOOR:0,
		Micro_9_Output_DOOR:0,
		Micro_9_Output_FUNCTIONDATA:0,
		
		Micro_10_Input_BASICFUNCTION:0,
		Micro_10_Input_SUBFUNCTION:0,
		Micro_10_Input_LIFT:0,
		Micro_10_Input_FLOOR:0,
		Micro_10_Input_DOOR:0,
		Micro_10_Input_FUNCTIONDATA:0,
		
		Micro_10_Output_BASICFUNCTION:0,
		Micro_10_Output_SUBFUNCTION:0,
		Micro_10_Output_LIFT:0,
		Micro_10_Output_FLOOR:0,
		Micro_10_Output_DOOR:0,
		Micro_10_Output_FUNCTIONDATA:0,
		
		Micro_11_Input_BASICFUNCTION:0,
		Micro_11_Input_SUBFUNCTION:0,
		Micro_11_Input_LIFT:0,
		Micro_11_Input_FLOOR:0,
		Micro_11_Input_DOOR:0,
		Micro_11_Input_FUNCTIONDATA:0,
		
		Micro_11_Output_BASICFUNCTION:0,
		Micro_11_Output_SUBFUNCTION:0,
		Micro_11_Output_LIFT:0,
		Micro_11_Output_FLOOR:0,
		Micro_11_Output_DOOR:0,
		Micro_11_Output_FUNCTIONDATA:0,
		
		Micro_12_Input_BASICFUNCTION:0,
		Micro_12_Input_SUBFUNCTION:0,
		Micro_12_Input_LIFT:0,
		Micro_12_Input_FLOOR:0,
		Micro_12_Input_DOOR:0,
		Micro_12_Input_FUNCTIONDATA:0,
		
		Micro_12_Output_BASICFUNCTION:0,
		Micro_12_Output_SUBFUNCTION:0,
		Micro_12_Output_LIFT:0,
		Micro_12_Output_FLOOR:0,
		Micro_12_Output_DOOR:0,
		Micro_12_Output_FUNCTIONDATA:0,
	},	

	'PARAMETER_HALTESTELLE': {
		P_Haltestelle_erlaubt:0,
		P_BundigWert:0,
		P_Notevakuierung_erlaubt:0,
		P_Durchlader:0,
		P_Schleusenfunktion:0,

		Z0_P_Zugang_erlaubt:0,
		Z0_P_Kabinenrufe_sperren:0,
		Z0_P_Aussenrufe_sperren:0,
		Z0_P_E1_KB_Rufe_gesperrt:0,
		Z0_P_E1_AR_Rufe_gesperrt:0,

		Z0_P_Turart:0,
		Z0_P_Tur_Ruhestellung:0,
		Z0_P_Vorzeitige_Turoffnung:0,
		Z0_P_Tur_default_offenhaltezeit:0,
		Z0_P_Turzeit_wiederoeffnen:0,
		Z0_P_Turzeit_verkurzen:0,

		Z0_Micro_0_Input_BASICFUNCTION:0,
		Z0_Micro_0_Input_SUBFUNCTION:0,
		Z0_Micro_0_Input_LIFT:0,
		Z0_Micro_0_Input_FLOOR:0,
		Z0_Micro_0_Input_DOOR:0,
		Z0_Micro_0_Input_FUNCTIONDATA:0,

		Z0_Micro_0_Output_BASICFUNCTION:0,
		Z0_Micro_0_Output_SUBFUNCTION:0,
		Z0_Micro_0_Output_LIFT:0,
		Z0_Micro_0_Output_FLOOR:0,
		Z0_Micro_0_Output_DOOR:0,
		Z0_Micro_0_Output_FUNCTIONDATA:0,

		Z0_Micro_1_Input_BASICFUNCTION:0,
		Z0_Micro_1_Input_SUBFUNCTION:0,
		Z0_Micro_1_Input_LIFT:0,
		Z0_Micro_1_Input_FLOOR:0,
		Z0_Micro_1_Input_DOOR:0,
		Z0_Micro_1_Input_FUNCTIONDATA:0,

		Z0_Micro_1_Output_BASICFUNCTION:0,
		Z0_Micro_1_Output_SUBFUNCTION:0,
		Z0_Micro_1_Output_LIFT:0,
		Z0_Micro_1_Output_FLOOR:0,
		Z0_Micro_1_Output_DOOR:0,
		Z0_Micro_1_Output_FUNCTIONDATA:0,

		Z0_Micro_2_Input_BASICFUNCTION:0,
		Z0_Micro_2_Input_SUBFUNCTION:0,
		Z0_Micro_2_Input_LIFT:0,
		Z0_Micro_2_Input_FLOOR:0,
		Z0_Micro_2_Input_DOOR:0,
		Z0_Micro_2_Input_FUNCTIONDATA:0,

		Z0_Micro_2_Output_BASICFUNCTION:0,
		Z0_Micro_2_Output_SUBFUNCTION:0,
		Z0_Micro_2_Output_LIFT:0,
		Z0_Micro_2_Output_FLOOR:0,
		Z0_Micro_2_Output_DOOR:0,
		Z0_Micro_2_Output_FUNCTIONDATA:0,

		Z0_Micro_3_Input_BASICFUNCTION:0,
		Z0_Micro_3_Input_SUBFUNCTION:0,
		'Z0_Micro_3_Input_LIFT':0,
		Z0_Micro_3_Input_FLOOR:0,
		Z0_Micro_3_Input_DOOR:0,
		Z0_Micro_3_Input_FUNCTIONDATA:0,

		Z0_Micro_3_Output_BASICFUNCTION:0,
		Z0_Micro_3_Output_SUBFUNCTION:0,
		Z0_Micro_3_Output_LIFT:0,
		Z0_Micro_3_Output_FLOOR:0,
		Z0_Micro_3_Output_DOOR:0,
		Z0_Micro_3_Output_FUNCTIONDATA:0,

		Z1_P_Zugang_erlaubt:0,
		Z1_P_Kabinenrufe_sperren:0,
		Z1_P_Aussenrufe_sperren:0,
		Z1_P_E1_KB_Rufe_gesperrt:0,
		Z1_P_E1_AR_Rufe_gesperrt:0,

		Z1_P_Turart:0,
		Z1_P_Tur_Ruhestellung:0,
		Z1_P_Vorzeitige_Turoffnung:0,
		Z1_P_Tur_default_offenhaltezeit:0,
		Z1_P_Turzeit_wiederoeffnen:0,
		Z1_P_Turzeit_verkurzen:0,

		Z1_Micro_0_Input_BASICFUNCTION:0,
		Z1_Micro_0_Input_SUBFUNCTION:0,
		Z1_Micro_0_Input_LIFT:0,
		Z1_Micro_0_Input_FLOOR:0,
		Z1_Micro_0_Input_DOOR:0,
		Z1_Micro_0_Input_FUNCTIONDATA:0,

		Z1_Micro_0_Output_BASICFUNCTION:0,
		Z1_Micro_0_Output_SUBFUNCTION:0,
		Z1_Micro_0_Output_LIFT:0,
		Z1_Micro_0_Output_FLOOR:0,
		Z1_Micro_0_Output_DOOR:0,
		Z1_Micro_0_Output_FUNCTIONDATA:0,

		Z1_Micro_1_Input_BASICFUNCTION:0,
		Z1_Micro_1_Input_SUBFUNCTION:0,
		Z1_Micro_1_Input_LIFT:0,
		Z1_Micro_1_Input_FLOOR:0,
		Z1_Micro_1_Input_DOOR:0,
		Z1_Micro_1_Input_FUNCTIONDATA:0,

		Z1_Micro_1_Output_BASICFUNCTION:0,
		Z1_Micro_1_Output_SUBFUNCTION:0,
		Z1_Micro_1_Output_LIFT:0,
		Z1_Micro_1_Output_FLOOR:0,
		Z1_Micro_1_Output_DOOR:0,
		Z1_Micro_1_Output_FUNCTIONDATA:0,

		Z1_Micro_2_Input_BASICFUNCTION:0,
		Z1_Micro_2_Input_SUBFUNCTION:0,
		Z1_Micro_2_Input_LIFT:0,
		Z1_Micro_2_Input_FLOOR:0,
		Z1_Micro_2_Input_DOOR:0,
		Z1_Micro_2_Input_FUNCTIONDATA:0,

		Z1_Micro_2_Output_BASICFUNCTION:0,
		Z1_Micro_2_Output_SUBFUNCTION:0,
		Z1_Micro_2_Output_LIFT:0,
		Z1_Micro_2_Output_FLOOR:0,
		Z1_Micro_2_Output_DOOR:0,
		Z1_Micro_2_Output_FUNCTIONDATA:0,

		Z1_Micro_3_Input_BASICFUNCTION:0,
		Z1_Micro_3_Input_SUBFUNCTION:0,
		Z1_Micro_3_Input_LIFT:0,
		Z1_Micro_3_Input_FLOOR:0,
		Z1_Micro_3_Input_DOOR:0,
		Z1_Micro_3_Input_FUNCTIONDATA:0,

		Z1_Micro_3_Output_BASICFUNCTION:0,
		Z1_Micro_3_Output_SUBFUNCTION:0,
		Z1_Micro_3_Output_LIFT:0,
		Z1_Micro_3_Output_FLOOR:0,
		Z1_Micro_3_Output_DOOR:0,
		Z1_Micro_3_Output_FUNCTIONDATA:0,
	},

	'PARAMETER_KBTUR': {
		P_TurArt:0,
		P_Endschalter_offen_vorhanden:0,
		P_Endschalter_geschlossen_vorhanden:0,
		P_Tur_zu_nachlauf:0,
		P_Tur_auf_nachlauf:0,
		P_Tur_auf_max_zeit:0,
		P_Tur_zu_max_zeit:0,
	}	
};

let defaultFormState = {};

function ParameterInfoDialog(props) {
	const dispatch = useDispatch();
	const parameterInfoDialog = useSelector(({ productApp }) => productApp.dialog.parameterInfoDialog);	
	
	defaultFormState = _.isEmpty(parameterInfoDialog.data) ? {} : defaultParameters[parameterInfoDialog.data.rootGroup];
	
	const { form, setForm } = useForm(defaultFormState);

	const initDialog = useCallback(() => {
		setForm({ ...defaultFormState, ...parameterInfoDialog.data.params }); 
	}, [parameterInfoDialog.data, setForm]);

	useEffect(() => {	
		if (parameterInfoDialog.props.open) {
			initDialog();
		}
	}, [parameterInfoDialog.props.open, initDialog]);

	function closeComposeDialog() {
		return dispatch(closeParameterInfoDialog());
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...parameterInfoDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>			
			<div className="w-full rounded-8 shadow">
				<div className="p-16 px-4 flex flex-row items-center justify-between">
					<Typography className="h1 px-12">Information</Typography>
				</div>				
				<FuseScrollbars>
					<Table>					
						<TableBody>
							{Object.keys(form).map((key, n) => {
								return (
									<TableRow
										className="h-64 cursor-pointer"
										hover
										tabIndex={-1}
										key={`row-${key}`}
									>										
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{key}
										</TableCell>

										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{form[key]}
										</TableCell>																					
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</FuseScrollbars>
				<Divider className="card-divider w-full" />				
			</div>
		</Dialog>
	);
}

export default ParameterInfoDialog;

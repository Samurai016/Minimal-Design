import { gettext } from "i18n";
import {  KEY_COLOR,
          KEY_WEEKDAY_FORMAT,
          KEY_DATE_FORMAT } from "../common/constants";

function Settings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">{ gettext("color") }</Text>}>
        <ColorSelect
          settingsKey={KEY_COLOR}
          colors={[
            {color: '#607D8B'},
            {color: '#FFC107'},
            {color: '#795548'},
            {color: '#7CB342'},
            {color: '#F06292'},
            {color: '#673AB7'},
            {color: '#EF5350'},
            {color: '#E0E0E0'},
          ]}
        />
      </Section>
      <Section
        description={<Text><Link source={ gettext("formatsLink") }>{ gettext("formatsLabel") }</Link></Text>}
        title={<Text bold align="center">{gettext("formats")}</Text>}>
        <TextImageRow
          label={<Text><Link source={ gettext("imageLink") }>{ gettext("imageLabel") }</Link></Text>}
          icon={ gettext("imageLink") }
        />
        <TextInput
          label={ gettext("weekdayformat") }
          settingsKey={KEY_WEEKDAY_FORMAT}
        />
        <TextInput
          label={ gettext("dateformat") }
          settingsKey={KEY_DATE_FORMAT}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(Settings);
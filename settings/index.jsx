import { gettext } from "i18n";

function Settings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">{ gettext("color") }</Text>}>
        <ColorSelect
          settingsKey="color"
          colors={[
            {color: '#24FEC9'},
            {color: '#FFCC00'},
            {color: '#FE2551'},
          ]}
        />
      </Section>
      <Section
        title={<Text bold align="center">{ gettext("visualization") }</Text>}>
        <Toggle
          settingsKey="showbattery"
          label={ gettext("batterylabel") }
        />
      </Section>
      <Section
        description={<Text><Link source={ gettext("formatsLink") }>{ gettext("formatsLabel") }</Link></Text>}
        title={<Text bold align="center">Formats</Text>}>
        <TextImageRow
          label={<Text><Link source={ gettext("imageLink") }>{ gettext("imageLabel") }</Link></Text>}
          icon="https://via.placeholder.com/150"
        />
        <TextInput
          label={ gettext("weekdayformat") }
          settingsKey="weekdayformat"
        />
        <TextInput
          label={ gettext("dateformat") }
          settingsKey="dateformat"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(Settings);
import { gettext } from "i18n";
import {  DISPLAY_ELEMENTS,
          KEY_COLOR,
          KEY_DISPLAY_ELEMENT,
          KEY_DISPLAY_ELEMENT_FLAG,
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
            {color: '#24FEC9'},
            {color: '#FFCC00'},
            {color: '#FE2551'},
          ]}
        />
      </Section>
      <Section
        title={<Text bold align="center">{ gettext("visualization") }</Text>}>
        <Toggle
          settingsKey={KEY_DISPLAY_ELEMENT_FLAG}
          label={ gettext("displayelementflaglabel") }
        />
        <Select
          label={ gettext("displayelementlabel") }
          settingsKey={KEY_DISPLAY_ELEMENT}
          options={DISPLAY_ELEMENTS.map(name => ({ name: gettext(name), value: name }))}
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
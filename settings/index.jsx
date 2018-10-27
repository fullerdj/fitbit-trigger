function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">IFTTT Webhooks Key</Text>}>
        <TextInput
          title="Paste key here"
          label="IFTTT Maker Webhooks Key"
          settingsKey="setting_IFTTTKey"
          action="Save Key"
         />
      </Section>
      <Section
        title={<Text bold align="center">Event Names</Text>}>
        <AdditiveList
          title="Event Names"
          settingsKey="setting_triggers"
          maxItems="6"
          addAction={
            <TextInput
              title="Add a Value"
              label="Add an Event"
              placeholder="new_trigger"
              action="Add Event"
            />
          }
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
function mySettings(props) {
  let screenWidth = props.settingsStorage.getItem("screenWidth");
  let screenHeight = props.settingsStorage.getItem("screenHeight");

  return (
    <Page>
        <ImagePicker
          title="Background Image"
          description="Pick an image to use as your background."
          label="Pick a Background Image"
          sublabel="Background image picker"
          settingsKey="background-image"
          imageWidth={ screenWidth }
          imageHeight={ screenHeight }
        />
    </Page>
  );
}

registerSettingsPage(mySettings);

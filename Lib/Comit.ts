export const commitUserScore = async (userName: string, score: number) => {
  const ip = await fetch("http://checkip.amazonaws.com").then((res) =>
    res.json()
  );
  const locationRes = await fetch(`https://ipapi.co/${ip}/json/`).then((res) =>
    res.json()
  );
  console.log(locationRes);

  const formData = new FormData();
  formData.append("user_name", userName);
  formData.append("user_score", `${score}`);
  formData.append("latitude", `${locationRes?.latitude}`);
  formData.append("longitude", `${locationRes?.longitude}`);
  formData.append("country", `${locationRes?.country_code}`);
};

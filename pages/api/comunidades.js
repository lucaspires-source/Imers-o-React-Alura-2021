import { SiteClient } from "datocms-client";

const recebedorDeRequests = async (req, res) => {
  if (req.method === "POST") {
    const TOKEN = "1fd1b1282fb948330ee0ba6d3dab95";

    const client = new SiteClient(TOKEN);

    const registroCriado = await client.item.create({
      itemType: "967735",
      ...req.body,
    });
    res.json({
      registroCriado: registroCriado,
    });
  }
  res.status(404).json({
      message:'deu ruim em tentar dar um GET'
  })
};

export default recebedorDeRequests;

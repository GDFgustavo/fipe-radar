import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { Resend } from "https://esm.sh/resend@3.2.0"

const supabase = createClient(
  Deno.env.get("SUPA_URL")!,
  Deno.env.get("SUPA_SERVICE_ROLE_KEY")!
)

const resend = new Resend(Deno.env.get("RESEND_API_KEY")!)

async function getFipePrice(
  vehicleType: string,
  brand: string,
  model: string,
  year: string
) {
  try {
    const url = `https://parallelum.com.br/fipe/api/v2/${vehicleType}/brands/${brand}/models/${model}/years/${year}`
    const response = await fetch(url)

    if (!response.ok) {
      console.error("❌ Erro na requisição FIPE:", response.status)
      return null
    }

    const data = await response.json()
    const valor = data.price

    if (!valor) {
      console.error("❌ Campo 'price' não encontrado no retorno da FIPE:", data)
      return null
    }

    const valorNumerico = parseFloat(
      valor.replace("R$ ", "").replace(/\./g, "").replace(",", ".")
    )

    console.log("✅ Valor FIPE retornado:", valorNumerico)
    return valorNumerico
  } catch (error) {
    console.error("❌ Erro ao buscar preço FIPE:", error)
    return null
  }
}

Deno.serve(async () => {
  console.log("Verificando monitoramento de preço FIPE...")

  const { data: alerts, error } = await supabase
    .from("price_alerts")
    .select("*")
    .eq("email_sent", false)
    .eq("is_confirmed", true)

  if (error) {
    console.error("Erro ao buscar monitoramentos:", error)
    return new Response("Erro ao buscar monitoramentos", { status: 500 })
  }

for (const alert of alerts) {
  try {
    const fipePrice = await getFipePrice(
      alert.vehicle_type,
      alert.brand,
      alert.model,
      alert.year
    )

    if (!fipePrice) continue;

    console.log(`FIPE atual: ${fipePrice} | alvo: ${alert.target_price}`)

      const emailHtml = `<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meta de Preço Atingida!</title>
</head>

<body
    style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0"
                    style="max-width: 600px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                    <tr>
                        <td align="center" style="padding: 30px 20px; background-color: #fff;">
                            <img src="https://servidor-estaticos-one-puce.vercel.app/fipe_logo_black.png"
                                     alt="Fipe Radar"
                                     width="40"
                                     border="0"
                                     style="display: block; width: 40px; max-width: 100%; height: auto; border: 0; outline: none; text-decoration: none; color: #000;" />
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2
                                style="margin: 0 0 16px 0; color: #000; font-size: 20px; font-weight: 700; line-height: 24px;">
                                Boas notícias no seu Radar!</h2>
                            <p style="margin: 0 0 24px 0; color: #666666; font-size: 16px; line-height: 24px;">O veículo
                                que você estava monitorando sofreu uma alteração de preço na tabela FIPE e atingiu a
                                meta configurada!</p>

                            <table width="100%" border="0" cellspacing="0" cellpadding="16"
                                style="background-color: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; margin-bottom: 30px;">
                                <tr>
                                    <td>
                                        <p
                                            style="color:#666666; font-size:15px; font-family:'Roboto', Arial, sans-serif; margin:0 0 8px 0;">
                                            Marca:
                                            <strong style="color: #000;"> ${alert.brand_name}</strong> 
                                        </p>
                                        <p
                                            style="color:#666666; font-size:15px; font-family:'Roboto', Arial, sans-serif; margin:0 0 8px 0;">
                                            Modelo:
                                            <strong style="color: #000;"> ${alert.model_name}</strong> 
                                        </p>
                                        <p
                                            style="color:#666666; font-size:15px; font-family:'Roboto', Arial, sans-serif; margin:0 0 8px 0;">
                                            Ano:
                                            <strong style="color: #000;"> ${alert.year_name}</strong> 
                                        </p>
                                        <p style="margin: 0 0 4px 0; color: #666666; font-size: 16px;">Seu preço
                                            desejado: <strong style="color: #000;">R$ ${alert.target_price}</strong></p>
                                        <p style="margin: 0; color: #666666; font-size: 15px; font-family:'Roboto', Arial, sans-serif;">Preço
                                            atual na FIPE: 
                                            <strong style=" color: #16a34a;">R$ ${alert.fipePrice}</strong>
                                             </p>
                                    </td>
                                </tr>
                            </table>

                            <table border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center" style="border-radius: 6px; background-color: #000; border: 1px solid #fff">
                                        <a href="https://www.fiperadar.site/meus-monitoramentos" target="_blank"
                                            style="display: inline-block; padding: 10px 28px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px;">Ver
                                            meus monitoramentos</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center"
                            style="padding: 20px; background-color: #fff; border-top: 1px solid #e2e8f0;">
                            <p style="margin: 0; color: #666666; font-size: 12px; line-height: 16px;">Você recebeu este
                                e-mail porque configurou um alerta de preço no Fipe Radar.</p>
                            <p style="margin: 6px 0 0 0; color: #666666; font-size: 12px; line-height: 16px;">&copy;
                                2026 Fipe Radar. Todos os direitos reservados.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>`

const updateData: Record<string, any> = { 
        current_price: fipePrice 
}

const hitTarget = (alert.price_trend === 'down' && fipePrice <= alert.target_price) ||
    (alert.price_trend === 'up' && fipePrice >= alert.target_price);

    if (hitTarget) {
    await resend.emails.send({
        from: "Fipe Radar <monitoring@fiperadar.site>",
        to: alert.email,
        subject: "🚗 Monitoramento de preço FIPE atingido!",
        html: emailHtml,
    })

    updateData.email_sent = true
    console.log(`📩 Email enviado para ${alert.email}`)
    }

    await supabase
    .from("price_alerts")
    .update(updateData)
    .eq("id", alert.id)

    } catch (err) {
    console.error("Erro ao processar monitoramento:", err)
    }
}

    return new Response("Verificação concluída")
})

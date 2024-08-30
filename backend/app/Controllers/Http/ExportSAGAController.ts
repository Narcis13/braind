import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import xmlbuilder from 'xmlbuilder'

export default class ExportSAGAController{
  public async transformToXml({ request, response }: HttpContextContract) {
    const jsonData = request.input('invoiceData')

    const xml = xmlbuilder.create('Factura')

    // Antet
    const antet = xml.ele('Antet')
    antet.ele('FurnizorNume').dat(jsonData.numefurnizor)
    antet.ele('FurnizorCIF').dat(jsonData.cuifurnizor)
    antet.ele('FurnizorNrRegCom').dat(jsonData.note.split(';')[0] || '')
    antet.ele('FurnizorAdresa').dat('CAL. CHISINAULUI, NR.32, CORP CLADIRE C4 CAMERA 4 SI 5, CORP CLADIRE C5 CAMERELE 3, 4 SI 5')
    antet.ele('FurnizorTara').dat('RO')
    antet.ele('FurnizorJudet').dat('IS')
    antet.ele('FurnizorLocalitate').dat('IASI')
    antet.ele('FurnizorTelefon').dat('0232273443')
    antet.ele('FurnizorMail').dat('')
    antet.ele('ClientNume').dat(jsonData.numeclient)
    antet.ele('ClientCIF').dat(jsonData.cuiclient)
    antet.ele('ClientNrRegCom').dat(jsonData.note.split(';')[0] || '')
    antet.ele('ClientAdresa').dat('BD. PETROCHIMISTILOR BL.32 AP 18')
    antet.ele('Cod').dat('')
    antet.ele('FacturaID').dat(jsonData.id.toString())
    antet.ele('FacturaNumar').dat(jsonData.nrfact)
    antet.ele('FacturaData').dat(new Date(jsonData.datafact).toLocaleDateString('ro-RO'))
    antet.ele('FacturaScadenta').dat(new Date(jsonData.scadenta).toLocaleDateString('ro-RO'))
    antet.ele('FacturaTaxareInversa').dat('Nu')
    antet.ele('FacturaTVAIncasare').dat('Nu')
    antet.ele('FacturaTip').dat('F')
    antet.ele('FacturaCurs').dat('0.0000')
    antet.ele('FacturaMoneda').dat('RON')
    antet.ele('FacturaCotaTVA').dat('19')
    antet.ele('FacturaGreutate').dat('0.000')

    // Detalii
    const detalii = xml.ele('Detalii')
    const continut = detalii.ele('Continut')

    jsonData.itemi.forEach((item, index) => {
      const linie = continut.ele('Linie')
      linie.ele('LinieNrCrt').dat((index + 1).toString())
      linie.ele('Descriere').dat('')
      linie.ele('Cont').dat('371.001')
      linie.ele('CodBare')
      linie.ele('CodArticolFurnizor').dat(item.denumire)
      linie.ele('CodArticolClient').dat(item.denumire)
      linie.ele('InformatiiSuplimentare').dat('Nedefinit')
      linie.ele('UM').dat('buc')
      linie.ele('Cantitate').dat(item.cantitate)
      linie.ele('Pret').dat(item.pret)
      const valoare = parseFloat(item.cantitate) * parseFloat(item.pret)
      linie.ele('Valoare').dat(valoare.toFixed(2))
      const tva = valoare * 0.19
      linie.ele('TVA').dat(tva.toFixed(2))
      linie.ele('ProcTVA').dat('19')
      linie.ele('PretVanzare').dat((parseFloat(item.pret) * 1.19).toFixed(2))
    })

    // Sumar
    const sumar = xml.ele('Sumar')
    sumar.ele('TotalValoare').dat(jsonData.totalfaratva.toFixed(2))
    sumar.ele('TotalTVA').dat((jsonData.totalcutva - jsonData.totalfaratva).toFixed(2))
    sumar.ele('Total').dat(jsonData.totalcutva.toFixed(2))

    // FacturaID
    xml.ele('FacturaID').dat(jsonData.id.toString())

    // Observatii
    const observatii = xml.ele('Observatii')
    observatii.ele('txtObservatii')
    observatii.ele('SoldClient')

    const xmlString = xml.end({ pretty: true })

    return response.type('application/xml').send(xmlString)
  }
}
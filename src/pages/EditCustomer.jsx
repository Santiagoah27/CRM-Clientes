import { editCustomers, updateCustomer } from "../data/customers"
import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom"
import FormCustomer from "../components/FormCustomer"
import Error from "../components/Error"

export async function loader({params}) {
    const customer = await editCustomers(params.customerId)
    if(Object.values(customer).length === 0){
        throw new Response('', {
            status: 404,
            statusText: 'No hay Resultados'
        })
    }
    return customer
}

export async function action({request, params}) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    const email = formData.get('email')
  
    const errors = []
    if(Object.values(data).includes('')){
      errors.push('Todos los campos son obligatorios')
    }
  
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(email)){
      errors.push('El email no es valido')
    }
    if(Object.keys(errors).length){
      return errors
    }
  
    await updateCustomer(params.customerId,data)
  
    return redirect('/')
  }

const EditCustomer = () => {
    const navigate = useNavigate()
    const customer = useLoaderData()
    const errors = useActionData()

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar CLiente</h1>
      <p className="mt-3">A continuación podras modificar los datos de un cliente</p>
      <div className="flex justify-end">
        <button
            className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
            onClick={() => navigate('/')}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">

        {errors?.length && errors.map( (error, i) => <Error key={i}>{error}</Error>)}

        <Form
           method="post"
           noValidate
        >
           <FormCustomer
              customer={customer}
           />
            <input 
              type="submit"
              className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
              value="Editar Cliente"
            />
        </Form>
      </div>
    </>
  )
}

export default EditCustomer
import { Form, useNavigate, redirect } from "react-router-dom";
import { deleteCustomer } from "../data/customers";


export async function action ({params}) {
  await deleteCustomer(params.customerId)
  return redirect('/')
}

const Customer = ({ customer }) => {
  const navigate = useNavigate()
  const { id, nombre , telefono, email, empresa } = customer
  return (
    <tr className="border-b">
      <td className="p-6 space-y-2">
        <p className="text-2xl text-gray-800">{nombre}</p>
        <p>{empresa}</p>
      </td>

      <td className="p-6">
        <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Email: </span>{email}</p>
        <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Tel: </span>{telefono}</p>
      </td>

      <td className="p-6 flex gap-3">
        <button
           type="button"
           className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"
           onClick={() => navigate(`/customers/${id}/edit`)}
        >
            Editar
        </button>
        <Form
          method="post"
          action={`/customers/${id}/delete`}
          onSubmit={(e) => {
            if(!confirm('Deseas eliminar este registro')){
              e.preventDefault()
            }
          }}
        >
        <button
           type="submit"
           className="text-red-600 hover:text-red-700 uppercase font-bold text-xs"
        >
            Eliminar
        </button>

        </Form>
      </td>
    </tr>
  );
};

export default Customer;

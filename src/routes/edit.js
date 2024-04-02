import { 
    Form, 
    useLoaderData,
    redirect, 
    useNavigate,
} from "react-router-dom";
import { updateContact } from "../contacts";
import { deleteContact } from "../contacts";

export async function action({ request, params }) {
    const formData = await request.formData();
    var full = document.getElementById('first').value + " " + 
                document.getElementById('last').value;
    formData.append('full', full);
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
        <p>
            <span>이름</span>
            <input
            id="first"
            placeholder="First"
            aria-label="First name"
            type="text"
            name="first"
            defaultValue={contact.first}
            />
            <input
            id="last"
            placeholder="Last"
            aria-label="Last name"
            type="text"
            name="last"
            defaultValue={contact.last}
            />
        </p>
        <label>
            <span>자신 주소 링크</span>
            <input
            type="text"
            name="twitter"
            placeholder="@jack"
            defaultValue={contact.twitter}
            />
        </label>
        <label>
            <span>이미지 업로드 URL</span>
            <input
            placeholder="https://example.com/avatar.jpg"
            aria-label="Avatar URL"
            type="text"
            name="avatar"
            defaultValue={contact.avatar}
            />
        </label>
        <label>
            <span>자기소개</span>
            <textarea
            name="notes"
            defaultValue={contact.notes}
            rows={6}
            />
        </label>
        <input name="edit" type="hidden" defaultValue="edit" style={{ display: "none" }}/>
        <p>
            <button type="submit">저장</button>
            <button onClick={async ()=>{
                if(contact.edit != "edit"){
                    await deleteContact(contact.id);
                }
                navigate("/")
            }}>취소</button>
        </p>
    </Form>          
  );
}
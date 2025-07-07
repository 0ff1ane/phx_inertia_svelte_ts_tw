defmodule PhxInertiaSvelteTsTwWeb.DummyUserAuthPlug do
  import Inertia.Controller
  import Plug.Conn

  def init(opts) do
    opts
  end

  def call(conn, opts) do
    dummy_authenticate_user(conn, opts)
  end

  defp dummy_authenticate_user(conn, _opts) do
    user = %{email: "some.email@gg.wp", name: "Ook Oook"}

    # Here we are storing the user in the conn assigns (so
    # we can use it for things like checking permissions later on),
    # AND we are assigning a serialized represention of the user
    # to our Inertia props.
    conn
    # for other controllers etc
    |> assign(:current_user, user)
    # for inertia page props
    |> assign_prop(:me, user)
  end
end

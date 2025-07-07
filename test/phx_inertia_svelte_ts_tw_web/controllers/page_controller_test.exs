defmodule PhxInertiaSvelteTsTwWeb.PageControllerTest do
  use PhxInertiaSvelteTsTwWeb.ConnCase

  import Inertia.Testing

  describe "GET /" do
    test "renders the home page", %{conn: conn} do
      conn = get(conn, "/")
      assert inertia_component(conn) == "Login"

      page_props = inertia_props(conn)

      assert %{
               # from shared props
               me: %{email: "some.email@gg.wp", name: "Ook Oook"},
               # from login() controller props
               title: "Welcome to the login page"
             } = page_props
    end
  end
end

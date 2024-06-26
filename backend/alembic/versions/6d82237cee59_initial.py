"""initial

Revision ID: 6d82237cee59
Revises: 
Create Date: 2022-12-18 11:39:37.162345

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "6d82237cee59"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "colorthemes",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("gradientType", sa.String(), nullable=True),
        sa.Column("primaryColorR", sa.Integer(), nullable=True),
        sa.Column("primaryColorG", sa.Integer(), nullable=True),
        sa.Column("primaryColorB", sa.Integer(), nullable=True),
        sa.Column("secondaryColorR", sa.Integer(), nullable=True),
        sa.Column("secondaryColorG", sa.Integer(), nullable=True),
        sa.Column("secondaryColorB", sa.Integer(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_colorthemes_id"), "colorthemes", ["id"], unique=False)
    op.create_table(
        "controllers",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(), nullable=True),
        sa.Column("ipAddress", sa.String(), nullable=True),
        sa.Column("universe", sa.Integer(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("ipAddress"),
        sa.UniqueConstraint("name"),
    )
    op.create_index(op.f("ix_controllers_id"), "controllers", ["id"], unique=False)
    op.create_table(
        "drivers",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(), nullable=True),
        sa.Column("nickname", sa.String(), nullable=True),
        sa.Column("trackTime", sa.Integer(), nullable=True),
        sa.Column("profilePic", sa.String(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("name"),
        sa.UniqueConstraint("nickname"),
    )
    op.create_index(op.f("ix_drivers_id"), "drivers", ["id"], unique=False)
    op.create_table(
        "quotes",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("text", sa.String(), nullable=True),
        sa.Column("by", sa.String(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_quotes_id"), "quotes", ["id"], unique=False)
    op.create_table(
        "activedriver",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("driverId", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["driverId"],
            ["drivers.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_activedriver_id"), "activedriver", ["id"], unique=False)
    op.create_table(
        "controllersettings",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("driverId", sa.Integer(), nullable=True),
        sa.Column("controllerId", sa.Integer(), nullable=True),
        sa.Column("colorThemeId", sa.Integer(), nullable=True),
        sa.Column("autoPower", sa.Boolean(), nullable=True),
        sa.Column("idleEffectId", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["colorThemeId"],
            ["colorthemes.id"],
        ),
        sa.ForeignKeyConstraint(
            ["controllerId"],
            ["controllers.id"],
        ),
        sa.ForeignKeyConstraint(
            ["driverId"],
            ["drivers.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_controllersettings_id"), "controllersettings", ["id"], unique=False
    )
    op.create_table(
        "laptimes",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("driverId", sa.Integer(), nullable=True),
        sa.Column("car", sa.String(), nullable=True),
        sa.Column("trackName", sa.String(), nullable=True),
        sa.Column("trackConfig", sa.String(), nullable=True),
        sa.Column("time", sa.Float(), nullable=True),
        sa.Column(
            "setAt",
            sa.DateTime(timezone=True),
            server_default=sa.text("(CURRENT_TIMESTAMP)"),
            nullable=True,
        ),
        sa.ForeignKeyConstraint(
            ["driverId"],
            ["drivers.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_laptimes_id"), "laptimes", ["id"], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f("ix_laptimes_id"), table_name="laptimes")
    op.drop_table("laptimes")
    op.drop_index(op.f("ix_controllersettings_id"), table_name="controllersettings")
    op.drop_table("controllersettings")
    op.drop_index(op.f("ix_activedriver_id"), table_name="activedriver")
    op.drop_table("activedriver")
    op.drop_index(op.f("ix_quotes_id"), table_name="quotes")
    op.drop_table("quotes")
    op.drop_index(op.f("ix_drivers_id"), table_name="drivers")
    op.drop_table("drivers")
    op.drop_index(op.f("ix_controllers_id"), table_name="controllers")
    op.drop_table("controllers")
    op.drop_index(op.f("ix_colorthemes_id"), table_name="colorthemes")
    op.drop_table("colorthemes")
    # ### end Alembic commands ###
